const Mailgen = require("mailgen");

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Library SBSSU",
    link: "https://sbssu.ac.in/",
    logo: "https://sbssu.ac.in/images/Tricolor.png",
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
};

module.exports = { generateEmailTemplate };
