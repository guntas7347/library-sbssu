import prisma from "../../services/prisma.js";
import { createLog } from "../../utils/log.js";
import crs from "../../utils/crs/crs.js";
import { hashPassword } from "../../utils/bycrypt.js";
import { emailService } from "../../services/emailService.js";
import crypto from "crypto";

/**
 * A self-contained middleware to handle the entire process of creating a new staff member.
 * It validates input, creates the staff and auth records in a transaction,
 * sends a welcome email, and returns the final response.
 */
export const createStaffHandler = async (req, res) => {
  try {
    // The req.body is populated and validated by a preceding Zod middleware.
    const {
      fullName,
      username,
      email,
      rights,
      idNumber,
      ...restOfStaffData // Catches all other optional staff fields
    } = req.body;

    // Use a transaction to ensure creating the staff member and their auth record
    // either both succeed or both fail.
    const newStaffMember = await prisma.$transaction(async (tx) => {
      // A temporary password that will be immediately reset by the user.
      const hashedPassword = await hashPassword(crypto.randomUUID());

      // Step 1: Create the Staff record.
      const newStaff = await tx.staff.create({
        data: {
          fullName,
          idNumber,
          ...restOfStaffData,
        },
      });

      // Step 2: Create the associated Auth record.
      const newAuth = await tx.auth.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role: "staff",
          rights: rights || [],
          userType: "staff",
          twoFaSecret: crypto.randomUUID(),
          active: true,
          // Connect the new Auth record to the new Staff record.
          staff: {
            connect: { id: newStaff.id },
          },
        },
      });

      // Step 3: Update the Staff record with the new Auth ID to complete the two-way link.
      const linkedStaff = await tx.staff.update({
        where: { id: newStaff.id },
        data: { authId: newAuth.id },
      });

      return linkedStaff;
    });

    // After the transaction is successful, send the welcome email.
    await emailService.sendStaffWelcomeEmail(email, fullName, username);

    // Respond with a 201 "Created" status and the new staff data.
    return res.status(201).json(crs.STAFF_201_CREATED(newStaffMember));
  } catch (error) {
    // Log the detailed error for debugging.
    createLog(error);

    // Provide specific feedback for unique constraint violations.
    if (error.code === "P2002") {
      const target = error.meta?.target || [];
      if (target.includes("username"))
        return res.status(409).json(crs("username unavailable"));

      if (target.includes("idNumber"))
        return res.status(409).json(crs("id number unavailable"));
    }

    // For all other errors, send a generic 500 internal server error.
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};
