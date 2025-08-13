import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";
import { getNextSequenceValue } from "../../controllers/getNextSequenceValue.js";
import { generateApplicationId } from "../../utils/functions/idGenerator.js";
import { encryptText } from "../../utils/encrypt.crypto.js";
import { emailService } from "../../services/emailService.js"; // Import the email service

/**
 * A self-contained middleware to handle the creation of a new member application.
 * It generates a unique application ID, creates the record, sets a tracking cookie,
 * sends a confirmation email, and returns the final response.
 */
export const createApplicationHandler = async (req, res) => {
  try {
    // 1. Get validated data from the request body
    const { printApplicationLink, ...applicationData } = req.body;

    // 2. Generate a guaranteed unique, sequential application ID
    const yearSuffix = new Date().getFullYear().toString().slice(-2);
    const sequenceName = `applicationId_${yearSuffix}`;
    const nextValue = await getNextSequenceValue(prisma, sequenceName);
    const nextApplicationId = generateApplicationId(nextValue);

    // 3. Create the new application record in the database
    const application = await prisma.member.create({
      data: {
        ...applicationData,
        applicationId: nextApplicationId,
      },
    });

    // 4. Set a secure, httpOnly cookie to track the application
    const cookieOptions = {
      secure: process.env.NODE_ENV !== "dev",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 28), // 28 days
      path: "/",
      httpOnly: process.env.NODE_ENV !== "dev",
    };

    res.cookie("gh", encryptText(application.id), cookieOptions);

    // 5. Send the confirmation email (non-blocking)
    emailService.sendApplicationSubmittedEmail(
      application.email,
      application.fullName,
      application.applicationId,
      new Date(application.createdAt).toLocaleDateString(),
      `${printApplicationLink}?gh=${application.id}`
    );

    // 6. Send a success response
    return res
      .status(201)
      .json(crs.PUBLIC_201_APPLICATION_CREATED({ id: application.id }));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};
