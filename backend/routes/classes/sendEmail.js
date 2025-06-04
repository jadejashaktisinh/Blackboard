const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'workify.tevroninfo@gmail.com',
        pass: 'xaup pmmj zbcn huym'
    }
});

async function Sender(email, classDetails) {

    const info = await transporter.sendMail({
      from: "workify@support.pvt",
      to: email, 
      subject: "Class Join Request", 
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; padding: 24px; border-radius: 12px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 24px;">
              <h2 style="color: #1f2937; margin: 0; font-size: 24px; font-weight: 600;">Class Join Request</h2>
              <p style="color: #6b7280; font-size: 16px; margin-top: 8px;">
                  You have been invited to join a class
              </p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
              <div style="margin-bottom: 16px;">
                  <h3 style="color: #374151; font-size: 18px; margin: 0 0 8px 0;">Class Details</h3>
                  <p style="color: #4b5563; margin: 4px 0; font-size: 15px;">
                      <strong>Class Name:</strong> ${classDetails.C_Name}
                  </p>
                  <p style="color: #4b5563; margin: 4px 0; font-size: 15px;">
                      <strong>Subject:</strong> ${classDetails.C_Subject}
                  </p>
                  <p style="color: #4b5563; margin: 4px 0; font-size: 15px;">
                      <strong>Class Owner:</strong> ${classDetails. C_Creator}
                  </p>
              </div>
          </div>

          <div style="text-align: center; margin-bottom: 24px;">
              <a href="${"http://localhost:5173"}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
                  Join Class
              </a>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
          
          <div style="text-align: center;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                  If you did not expect this invitation, please ignore this email.
              </p>
          </div>
      </div>
      `, 
    });
}

const sendEmail = async(email, classDetails) => {
    try {
        console.log(email)
        await Sender(email, classDetails);
       
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = sendEmail;