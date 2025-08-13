import Mailgen from "mailgen";

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Library SBSSU",
    link: "https://sbssu.ac.in/",
    logo: "https://sbssu.ac.in/8d9475c8-d451-4424-93f9-ac6f0df32284.jpeg",
  },
});

export const template = {
  issueBookConfirmation: ({
    name,
    accessionNumber,
    title,
    author,
    dueDate,
    issueDate,
    cardNumber,
  }) => {
    return mailGenerator.generate({
      body: {
        name: name,
        intro:
          "This is a confirmation email to inform you that you have borrowed a book from Central Library.",
        table: {
          data: [
            {
              "Accession Number": accessionNumber,
              Book: title,
              Author: author,
              "Library Card Number": cardNumber,
              "Issue Date": issueDate,
              "Due Date": dueDate,
            },
          ],
        },
        outro:
          "Please ensure to return the book by the due date to avoid any late fees. If you have any questions, feel free to contact us.",
      },
    });
  },
  returnBookConfirmation: ({
    name,
    accessionNumber,
    title,
    author,
    returnDate,
    issueDate,
    fine,
    cardNumber,
  }) => {
    return mailGenerator.generate({
      body: {
        name: name,
        intro:
          "This is a confirmation email to inform you that you have successfully returned a book to Library.",
        table: {
          data: [
            {
              "Accession Number": accessionNumber,
              Book: title,
              Author: author,
              "Library Card Number": cardNumber,
              "Issue Date": issueDate,
              "Return Date": returnDate,
              Fine: fine,
            },
          ],
        },
        outro:
          "Thank you for returning the book. If you have any further inquiries, feel free to contact us.",
      },
    });
  },
  resetPassword: (name, resetLink) => {
    return mailGenerator.generate({
      body: {
        name: name,
        intro: [
          "You have requested a password reset for your account at Shaheed Bhagat Singh State University's Central Library.",
        ],
        action: {
          instructions: "Please click the button below to reset your password",
          button: {
            color: "#22BC66",
            text: "Reset Password",
            link: resetLink,
          },
        },
        outro:
          "If you did not request this password reset, please ignore this email or contact the Library during working hours. We'd love to help.",
      },
    });
  },
  applicationSubmittedEmail: (
    applicantName,
    applicationID,
    applicationDate,
    printApplicationLink
  ) => {
    return mailGenerator.generate({
      body: {
        name: applicantName,
        intro: `Application Submitted Successfully! Your library membership application has been received and is pending approval.`,
        table: {
          data: [
            {
              "Application ID": applicationID,
              "Application Date": applicationDate,
            },
          ],
          columns: {
            customWidth: {
              "Application ID": "25%",
              "Application Date": "75%",
            },
            customAlignment: {
              "Application ID": "left",
              "Application Date": "left",
            },
          },
        },
        action: {
          instructions: "Next Steps:",
          button: {
            color: "#22BC66",
            text: "Print Application",
            link: printApplicationLink,
          },
        },
        outro: [
          "Click the Print button above to print this application.",
          "Get the printed application signed by your Head of Department (HOD).",
          "Sign the application yourself in the designated area.",
          "Submit the signed application to the Library Office for final approval.",
          "You will receive your Membership Confirmation email within 3-5* business days after submission.",
          "Note: This application can only be deleted from the device it was used to apply with.",
        ],
      },
    });
  },

  approvalEmail: (memberName, membershipID, libraryCards) => {
    return mailGenerator.generate({
      body: {
        name: memberName,
        intro: `We are pleased to inform you that your library account has been approved! You are now a registered member of the SBSSU Library and can start issuing books.`,
        table: {
          data: [
            {
              "Membership ID": membershipID,
              "Library Cards": libraryCards.join(", "),
            },
          ],
          columns: {
            customWidth: {
              "Membership ID": "25%",
              "Library Cards": "75%",
            },
            customAlignment: {
              "Membership ID": "left",
              "Library Cards": "left",
            },
          },
        },
        outro: [
          "You can log in to the library portal using your membership ID after resetting your password.",
          "You can now visit the library to start issuing books. If you have any questions, feel free to contact us. We're happy to assist!",
        ],
      },
    });
  },
  rejectionEmail: (memberName) => {
    return mailGenerator.generate({
      body: {
        name: memberName,
        intro: `We regret to inform you that your application for SBSSU Library membership has been rejected.`,
        outro: `If you have any questions or believe this decision was made in error, please feel free to contact us. Thank you for your interest in the SBSSU Library.`,
      },
    });
  },
  transactionConfirmation: ({
    fullName,
    transactionType,
    amount,
    balance,
    category,
    date,
  }) => {
    const typeText = transactionType === "CREDIT" ? "Credited" : "Debited";

    return mailGenerator.generate({
      body: {
        name: fullName,
        intro: `This is to inform you that ₹${amount.toFixed(
          2
        )} has been ${typeText.toLowerCase()} ${
          transactionType === "CREDIT" ? "to" : "from"
        } your library account.`,
        table: {
          data: [
            {
              "Transaction Type": typeText,
              Amount: `₹${amount.toFixed(2)}`,
              Category: category,
              Date: date || new Date().toLocaleDateString(),
              "Closing Balance": `₹${balance.toFixed(2)}`,
            },
          ],
        },
        outro:
          "If you did not authorize this transaction or have any queries, please contact the Library immediately.",
      },
    });
  },
  noDueConfirmationEmail: (
    memberName,
    membershipID,
    clearedDate = new Date()
  ) => {
    return mailGenerator.generate({
      body: {
        name: memberName,
        intro: `We are writing to confirm that your no-due clearance process has been successfully completed. Your library account is now marked as cleared.`,
        table: {
          data: [
            {
              "Membership ID": membershipID,
              "Cleared On": new Date(clearedDate).toLocaleDateString(),
            },
          ],
        },

        outro: [
          "Please collect your no-due form from the library during working hours.",
          "Thank you for being a valued member of the SBSSU Library. We appreciate your participation and responsible use of library resources. If you need any assistance in the future or wish to rejoin, please feel free to reach out. Wishing you all the best!",
        ],
      },
    });
  },
  dueTomorrowReminder: ({ name, title, author, dueDate }) => {
    return mailGenerator.generate({
      body: {
        name: name,
        intro: [
          "This is a friendly reminder that the following book is due to be returned tomorrow. We hope you enjoyed it!",
          "Please remember to return the book on time to avoid any overdue fines. You can check your account status or renew the book (if eligible) from library portal",
        ],
        table: {
          data: [
            {
              "Book Title": title,
              Author: author,
              "Due Date": new Date(dueDate).toLocaleDateString(),
            },
          ],
        },

        outro: [
          "If you have already returned the book or have any questions, please feel free to contact the library staff.",
        ],
      },
    });
  },

  staffWelcomeEmail: (name, username) => {
    return mailGenerator.generate({
      body: {
        name: name,
        intro: [
          "Welcome to the team! We are excited to have you at the SBSSU Library.",
          "Your account has been created. To get started, you need to set your password. Please click the button below and use the 'Forgot Password' option with your email address.",
        ],
        table: {
          data: [
            {
              "Your Username": username,
              Instructions:
                "Use this username to log in after setting your password.",
            },
          ],
        },

        outro:
          "If you have any questions or need assistance, please don't hesitate to reach out to the administration. We look forward to working with you!",
      },
    });
  },
};
