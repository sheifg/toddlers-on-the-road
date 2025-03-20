const { sendEmail } = require("../helpers/sendEmail");
module.exports = {
  sendConfirmEmail: async (req, res) => {
    const { userName, email, message } = req.body;

    if (!userName || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const messageConfirm = `
        
        <p>Hi ${userName},</p>

        <p>Thank you for your message:</p>

            <P>"<bold>${message}</bold>"</P>
       
        <p>We will get back to you soon.</p> 

        <p>Your team: <i>Toddlers on the Road</i></p> 
     `;

      await sendEmail({
        email: email,
        subject: "Thank you for contacting us!",
        message: messageConfirm,
      });

      res.status(200).json({
        success: true,
        message: "Email sent successfully!",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  },
};
