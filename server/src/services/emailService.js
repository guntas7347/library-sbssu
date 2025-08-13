/**
 * A centralized service for sending all application-related emails.
 */

import { template } from "../utils/email/templates.js";
import sendMail from "./nodemailer.js";

/**
 * A centralized service for sending all application-related emails.
 */
export const emailService = {
  /**
   * Sends an application submitted confirmation email to an applicant.
   * @param {string} email - The recipient's email.
   * @param {string} applicantName - The applicant's full name.
   * @param {string} applicationID - The submitted application ID.
   * @param {string} applicationDate - The date the application was submitted.
   * @param {string} printApplicationLink - The full URL to print the application.
   */
  sendApplicationSubmittedEmail: async (
    email,
    applicantName,
    applicationID,
    applicationDate,
    printApplicationLink
  ) => {
    const subject =
      "Your SBSSU Library Membership Application has been Submitted";
    const body = template.applicationSubmittedEmail(
      applicantName,
      applicationID,
      applicationDate,
      printApplicationLink
    );
    return await sendMail(email, subject, body);
  },

  /**
   * Sends an application approval email to a new member.
   * @param {string} email - The recipient's email.
   * @param {string} memberName - The member's full name.
   * @param {string} membershipID - The new membership ID.
   * @param {string[]} libraryCards - An array of allotted library card numbers.
   */
  sendApprovalEmail: async (email, memberName, membershipID, libraryCards) => {
    const subject = "Your SBSSU Library Membership has been Approved!";
    const body = template.approvalEmail(memberName, membershipID, libraryCards);
    return await sendMail(email, subject, body);
  },

  /**
   * Sends an application rejection email.
   * @param {string} email - The recipient's email.
   * @param {string} memberName - The applicant's full name.
   */
  sendRejectionEmail: async (email, memberName) => {
    const subject = "Update on Your SBSSU Library Membership Application";
    const body = template.rejectionEmail(memberName);
    return await sendMail(email, subject, body);
  },

  /**
   * Sends a book issue confirmation email.
   * @param {string} email - The recipient's email.
   * @param {object} details - The details of the issued book.
   */
  sendIssueConfirmationEmail: async (email, details) => {
    const subject = "Book Issued from SBSSU Library";
    const body = template.issueBookConfirmation(details);
    return await sendMail(email, subject, body);
  },

  /**
   * Sends a book return confirmation email.
   * @param {string} email - The recipient's email.
   * @param {object} details - The details of the returned book.
   */
  sendReturnConfirmationEmail: async (email, details) => {
    const subject = "Book Returned to SBSSU Library";
    const body = template.returnBookConfirmation(details);
    return await sendMail(email, subject, body);
  },

  /**
   * Sends a password reset email.
   * @param {string} email - The recipient's email.
   * @param {string} name - The user's name.
   * @param {string} resetLink - The unique password reset link.
   */
  sendPasswordResetEmail: async (email, name, resetLink) => {
    const subject = "Reset Your SBSSU Library Password";
    const body = template.resetPassword(name, resetLink);
    return await sendMail(email, subject, body);
  },

  /**
   * Sends a transaction confirmation email.
   * @param {string} email - The recipient's email.
   * @param {object} details - The details of the transaction.
   */
  sendTransactionConfirmationEmail: async (email, details) => {
    const subject = "Transaction Confirmation from SBSSU Library";
    const body = template.transactionConfirmation(details);
    return await sendMail(email, subject, body);
  },

  /**
   * Sends a no-due confirmation email.
   * @param {string} email - The recipient's email.
   * @param {string} memberName - The member's full name.
   * @param {string} membershipID - The member's ID.
   */
  sendNoDueConfirmationEmail: async (email, memberName, membershipID) => {
    const subject = "No-Due Certificate Confirmation - SBSSU Library";
    const body = template.noDueConfirmationEmail(memberName, membershipID);
    return await sendMail(email, subject, body);
  },

  /**
   * Sends an overdue book reminder email.
   * @param {string} email - The recipient's email.
   * @param {object} details - The details for the reminder.
   */
  sendOverdueReminderEmail: async (email, details) => {
    const subject = "Overdue Book Reminder from SBSSU Library";
    const body = template.dueTomorrowReminder(details);
    return await sendMail(email, subject, body);
  },

  /**
   * Sends a welcome email to a new staff member.
   * @param {string} email - The recipient's email.
   * @param {string} name - The staff member's full name.
   * @param {string} username - The staff member's assigned username.
   */
  sendStaffWelcomeEmail: async (email, name, username) => {
    const subject = "Welcome to the SBSSU Library Team!";
    const body = template.staffWelcomeEmail(name, username);
    return await sendMail(email, subject, body);
  },
};
