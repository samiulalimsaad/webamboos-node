var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "SendinBlue", // no need to set host or port etc.
    auth: {
        user: "saadnbiuraj@gmail.com",
        pass: "IF2UgdsryfQMvEOS",
    },
});

var mailOptions = {
    from: "saadnbiuraj@gmail.com",
    to: "saad.mcmhq@gmail.com",
    subject: "Sending Email using Node.js",
    text: `Hi Smartherd, thank you for your nice Node.js tutorials.
          I will donate 50$ for this course. Please send me payment options.`,
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
};

transporter
    .sendMail(mailOptions)
    .then((res) => console.log("Successfully sent"))
    .catch((err) => console.log("Failed ", err));

const mailOptions = {
    from: "samiulalimsaad@gmail.com",
    to: Order.email,
    subject: "Order purchase successfully",
    html: `<h3>Hi ${Order.email},</h3>
                    <p>thank you for purchase The Order</p>
                    <p>you paid ${Order.price} for ${Order.OrderName}.</p>
                    <p>Thank You</p>`,
};

await transporter
    .sendMail(mailOptions)
    .then((res) => console.log("Successfully sent"))
    .catch((err) => console.log("Failed ", err));
