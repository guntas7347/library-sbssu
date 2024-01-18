const Mailgen = require("mailgen");

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Library SBSSU",
    link: "https://sbssu.ac.in/",
    logo: "https://sbssu.ac.in/images/Tricolor.png",
  },
});

const generateOtpEmailTemplate = (name, otp) => {
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
};

module.exports = { generateOtpEmailTemplate };
