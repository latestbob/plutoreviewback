const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors');

app.use(express.json());
app.use(cors())

const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Alice' },
    { id: 3, name: 'Bob' },
    //
  ];
  
  // GET endpoint to return users
  app.get('/api/users', (req, res) => {
    res.json(users);
  });

//   POST Request send mail

app.post('/api/send', async (req, res) => {

    const { email, name } = req.body;

   


 var transport = nodemailer.createTransport({
      host: 'mail.plutobeautysupplies.com',
      port: 465,
      auth: {
        user: 'info@plutobeautysupplies.com',
        pass: 'BOBson246**'
      }
    });

  let mailOptions = {
    from: 'info@plutobeautysupplies.com',
    to: 'edidongbobson@gmail.com',
    subject: "New Pluto Review Submitted",
    html: `
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 24px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      <h1 style="font-size: 24px; font-weight: bold; color: #333;">New Pluto Beauty Review!</h1>
      <p style="margin-top: 16px; color: #333;"><strong>Username/Email:</strong> ${email}</p>
      <p style="color: #333;"><strong>Review Name:</strong> ${name}</p>
      <p style="margin-top: 16px; color: #666;">New review have been added to Pluto Beauty Supplies 🎉</p>
    </div>
  `,
  };

  // i have added new to mainbackend

  try {
    let info = await transport.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }



res.status(200).json({ message: 'Working' });




});



  // Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });