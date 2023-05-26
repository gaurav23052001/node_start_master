import twilio from 'twilio';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

/**
 * This function is used to send sms on phone using Twilio messaging service
 * @param {string} phoneNumber Phone number with country code
 * @param {string} messageBody SMS message body
 * @returns 
 */
export const sendSMS = async (phoneNumber, messageBody) => {
  // SMS will not be send incase of unit test
  if (process.env.NODE_ENV === 'test') {
    return true;
  }

  await twilioClient.messages
    .create({
      body: messageBody,
      messagingServiceSid: process.env.TWILIO_MESSAGE_SERVICE_ID,
      statusCallback: null,
      to: phoneNumber,
    })
    .catch((err) => logger.error(err));;
}

/**
 * This function is used to send bulk notification using Twilio notify service
 * @param {object} smsBindings An object of the phone numbers with their country codes 
 * @param {string} messageBody Notification message
 */
export const sendBulkInviteSMS = async (smsBindings, messageBody) => {
  twilioClient
    .notify
    .services(process.env.TWILIO_NOTIFY_SERVICE_ID)
    .notifications.create({
      toBinding: smsBindings,
      body: messageBody,
      callback: null,
    })
    .catch((err) => logger.error(err));
};