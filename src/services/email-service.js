const { MailJetEmailSend } = require('../../config/mailjet-smtp');
const uuid = require('uuid');
const { MAILJET_SENDER_EMAIL, MAILJET_SENDER_NAME, UX_URL } = process.env;
const sendJWTTokenForEmailVerification = async (username, email_address, token) => {
  const confirmationURI = UX_URL + '/verify-emailaddress' + `?confirmationToken=${token}`;
  const emailBody = {
    From: {
      Email: MAILJET_SENDER_EMAIL,
      Name: MAILJET_SENDER_NAME
    },
    To: [
      {
        Email: email_address,
        Name: username
      }
    ],
    Subject: 'Please verify email address.',
    TextPart: 'EMAIL VERIFICATION',
    HTMLPart: `
            <h3>Dear ${username}, Welcome to <a href=${UX_URL}>OneStopShop</a>!</h3>
              <p>How's it going mate!</p>
              <p>Please feel free to click on this link to have your email address verified and continue registration process.</p>
              Verification Link: 
                  <a href =${confirmationURI}>${confirmationURI}</a>
              <br />

            <h5>Have a great Day!!</h5>
            Kind regards!!
            <h5>${MAILJET_SENDER_NAME}</h5>
    `,
    CustomID: uuid.v4()
  };
  try {
    return await MailJetEmailSend(emailBody);
  } catch (err) {
    console.log('email-service:sendJWTTokenForEmailVerification | Error occured while processing jwt token email verification.. !!! ', err);
  }
};

module.exports = { sendJWTTokenForEmailVerification };