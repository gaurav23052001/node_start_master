import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../src/app';

const fakeRegisterData = {
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password: "User@123",
  phone: faker.phone.number('##########')
};

const urls = {
  register: '/api/auth/register',
  login: '/api/auth/login',
  forgotPassword: '/api/auth/forgot-password',
  resetPassword: '/api/auth/reset-password',
  sendEmailVerificationOTP: '/api/auth/email-verification-otp',
  emailVerification: '/api/auth/email-verification',
  sendPhoneVerificationOTP: '/api/auth/phone-verification-otp',
  phoneVerification: '/api/auth/phone-verification',
  socialLogin: '/api/auth/social/login'
}

let resetPasswordOTP = null,
  emailVerificationOTP = null,
  phoneVerificationOTP = null;

describe('User Register Tests', () => {
  test('User register | It responds with the validation errors...', async () => {
    const response = await request(app)
      .post(urls.register)
      .send({});

    expect(response.statusCode).toBe(422);
  });

  test('User register | It responds with the newly registered user...', async () => {
    const response = await request(app)
      .post(urls.register)
      .send(fakeRegisterData);

    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.email).toBe(fakeRegisterData.email);
    expect(response.statusCode).toBe(200);
  });

  test('User register | It responds with the duplicate email address error...', async () => {
    const response = await request(app)
      .post(urls.register)
      .send(fakeRegisterData);
    expect(response.statusCode).toBe(422);
  });
});

describe('User Login Tests', () => {
  test('User login | It responds with validation errors...', async () => {
    const response = await request(app)
      .post(urls.login)
      .send({});

    expect(response.statusCode).toBe(422);
  });

  test('User login | It responds with invalid login credentials...', async () => {
    const response = await request(app)
      .post(urls.login)
      .send({
        email: fakeRegisterData.email,
        password: 'invalid-password'
      });

    expect(response.statusCode).toBe(401);
  });

  test('User login | It responds with the user login success...', async () => {
    const response = await request(app)
      .post(urls.login)
      .send({
        email: fakeRegisterData.email,
        password: fakeRegisterData.password
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});

describe('User Forgot Password Tests', () => {
  test('User forgot password | It responds with validation errors...', async () => {
    const response = await request(app)
      .post(urls.forgotPassword)
      .send({});

    expect(response.statusCode).toBe(422);
  });

  test('User forgot password | It responds with invalid email address...', async () => {
    const response = await request(app)
      .post(urls.forgotPassword)
      .send({
        email: 'invalid.email@email.com'
      });

    expect(response.statusCode).toBe(404);
  });

  test('User forgot password | It responds with reset password OTP...', async () => {
    const response = await request(app)
      .post(urls.forgotPassword)
      .send({
        email: fakeRegisterData.email
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("otp");
    resetPasswordOTP = String(response.body.otp);
  });
});

describe('User Reset Password Tests', () => {
  test('User reset password | It responds with validation errors...', async () => {
    const response = await request(app)
      .post(urls.resetPassword)
      .send({});

    expect(response.statusCode).toBe(422);
  });

  test('User reset password | It responds with invalid email address...', async () => {
    const response = await request(app)
      .post(urls.resetPassword)
      .send({
        email: 'invalid.email@email.com',
        forgot_password_otp: resetPasswordOTP,
        password: fakeRegisterData.password,
      }); 
    expect(response.statusCode).toBe(404);
  });

  test('User reset password | It responds with invalid OTP...', async () => {
    const response = await request(app)
      .post(urls.resetPassword)
      .send({
        email: fakeRegisterData.email,
        forgot_password_otp: '999999',
        password: fakeRegisterData.password,
      }); 
    expect(response.statusCode).toBe(400);
  });

  test('User reset password | It responds with expired OTP...', async () => {
    const response = await request(app)
      .post(urls.resetPassword)
      .send({
        email: fakeRegisterData.email,
        forgot_password_otp: '111111',
        password: fakeRegisterData.password,
      });
    expect(response.statusCode).toBe(400);
  });

  test('User reset password | It responds with success...', async () => {
    const response = await request(app)
      .post(urls.resetPassword)
      .send({
        email: fakeRegisterData.email,
        forgot_password_otp: resetPasswordOTP,
        password: fakeRegisterData.password,
      });
    expect(response.statusCode).toBe(200);
  });
});

describe('Send Email Verification OTP Tests', () => {
  test('Send email verification OTP | It responds with validation errors...', async () => {
    const response = await request(app)
      .post(urls.sendEmailVerificationOTP)
      .send({});

    expect(response.statusCode).toBe(422);
  });

  test('Send email verification OTP | It responds with invalid email address...', async () => {
    const response = await request(app)
      .post(urls.sendEmailVerificationOTP)
      .send({
        email: 'invalid.email@email.com'
      }); 
    expect(response.statusCode).toBe(404);
  });

  test('Send email verification OTP | It responds with success...', async () => {
    const response = await request(app)
      .post(urls.sendEmailVerificationOTP)
      .send({
        email: fakeRegisterData.email
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("otp");
    emailVerificationOTP = String(response.body.otp);
  });
});

describe('User Email Verification Tests', () => {
  test('Email verification | It responds with validation errors...', async () => {
    const response = await request(app)
      .post(urls.emailVerification)
      .send({});

    expect(response.statusCode).toBe(422);
  });

  test('Email verification | It responds with invalid email address...', async () => {
    const response = await request(app)
      .post(urls.emailVerification)
      .send({
        email: 'invalid.email@email.com',
        otp: emailVerificationOTP
      }); 
    expect(response.statusCode).toBe(404);
  });

  test('Email verification | It responds with invalid OTP...', async () => {
    const response = await request(app)
      .post(urls.emailVerification)
      .send({
        email: fakeRegisterData.email,
        otp: '999999'
      }); 
    expect(response.statusCode).toBe(400);
  });

  test('Email verification | It responds with expired OTP...', async () => {
    const response = await request(app)
      .post(urls.emailVerification)
      .send({
        email: fakeRegisterData.email,
        otp: '111111'
      });
    expect(response.statusCode).toBe(400);
  });

  test('Email verification | It responds with success...', async () => {
    const response = await request(app)
      .post(urls.emailVerification)
      .send({
        email: fakeRegisterData.email,
        otp: emailVerificationOTP
      });
    expect(response.statusCode).toBe(200);
  });
});

describe('Send Phone Verification OTP Tests', () => {
  test('Send phone verification OTP | It responds with validation errors...', async () => {
    const response = await request(app)
      .post(urls.sendPhoneVerificationOTP)
      .send({});

    expect(response.statusCode).toBe(422);
  });

  test('Send phone verification OTP | It responds with invalid phone address...', async () => {
    const response = await request(app)
      .post(urls.sendPhoneVerificationOTP)
      .send({
        phone: '9999999999'
      }); 
    expect(response.statusCode).toBe(404);
  });

  test('Send phone verification OTP | It responds with success...', async () => {
    const response = await request(app)
      .post(urls.sendPhoneVerificationOTP)
      .send({
        phone: fakeRegisterData.phone
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("otp");
    phoneVerificationOTP = String(response.body.otp);
  });
});

describe('User Phone Verification Tests', () => {
  test('Phone verification | It responds with validation errors...', async () => {
    const response = await request(app)
      .post(urls.phoneVerification)
      .send({});

    expect(response.statusCode).toBe(422);
  });

  test('Phone verification | It responds with invalid phone address...', async () => {
    const response = await request(app)
      .post(urls.phoneVerification)
      .send({
        phone: '9999999999',
        otp: phoneVerificationOTP
      }); 
    expect(response.statusCode).toBe(404);
  });

  test('Phone verification | It responds with invalid OTP...', async () => {
    const response = await request(app)
      .post(urls.phoneVerification)
      .send({
        phone: fakeRegisterData.phone,
        otp: '999999'
      }); 
    expect(response.statusCode).toBe(400);
  });

  test('Phone verification | It responds with expired OTP...', async () => {
    const response = await request(app)
      .post(urls.phoneVerification)
      .send({
        phone: fakeRegisterData.phone,
        otp: '111111'
      });
    expect(response.statusCode).toBe(400);
  });

  test('Phone verification | It responds with success...', async () => {
    const response = await request(app)
      .post(urls.phoneVerification)
      .send({
        phone: fakeRegisterData.phone,
        otp: phoneVerificationOTP
      });
    expect(response.statusCode).toBe(200);
  });
});

describe('User Social Login Tests', () => {
  test('User social login | It responds with validation errors...', async () => {
    const response = await request(app)
      .post(urls.socialLogin)
      .send({});

    expect(response.statusCode).toBe(422);
  });

  test('User social login | It responds with invalid social login credentials...', async () => {
    const response = await request(app)
      .post(urls.socialLogin)
      .send({
        email: fakeRegisterData.email,
        name: fakeRegisterData.name,
        providerId: 'providerId',
        provider: 'google',
        accessToken: 'googleAccessToken'
      });
console.log('response: ', response);
    expect(response.statusCode).toBe(500);
  });
});
