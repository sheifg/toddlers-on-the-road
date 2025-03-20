const { sendEmail } = require("../helpers/sendEmail");
module.exports = {
  sendConfirmEmail: async (req, res) => {

    const { userName, email, message } = req.body;

    if (!userName || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

  
    try {
        const messageConfirm = `
        
        Hi ${userName},

        Thank you for your message:

        "<bold>${message}</bold>"
       
        We will get back to you soon. 

        Your team:<i>Toddlers on the Road</i>
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
