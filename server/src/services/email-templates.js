const Mailgen = require("mailgen");

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Library SBSSU",
    link: "https://sbssu.ac.in/",
    logo: "/sbssu-logo.png",
  },
});

const generateEmailTemplate = {
  otp: (name, otp) => {
    return mailGenerator.generate({
      body: {
        name: name,
        intro: [
          "Welcome to Shaheed Bhagat Singh State University's Centeral Library! We're very excited to have you on board.",
          `One Time Password for your account verification is ${otp}`,
        ],
        outro:
          "Need help, or have questions? Contact Library in working hours, we'd love to help.",
      },
    });
  },
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
          `Please click the link below to reset your password: [Reset Password](${resetLink})`,
        ],
        outro:
          "If you did not request this password reset, please ignore this email or contact the Library during working hours. We'd love to help.",
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
        outro:
          "You can now visit the library to start issuing books. If you have any questions, feel free to contact us. We're happy to assist!",
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
};

module.exports = { generateEmailTemplate };
