import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../src/app';

const fakeRegisterData = {
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password: "User@123",
  phone: faker.phone.number('##########')
};

const fakeProfileData = {
  name: faker.name.findName(),
  phone: fakeRegisterData.phone,
  country_name: faker.address.country(),
  country_code: '+91',
  dob: '1997-06-21',
  gender: 'Male',
  marital_status: 'Single',
  location: 'B-9, Sector-3, Noida',
  lat: '-150.12369852',
  lng: '44.25469112',
  about: 'This is about me.',
  profile_image: 'https:google.co.in',
};

const urls = {
  register: '/api/auth/register',
  login: '/api/auth/login',
  userProfile: '/api/users/profile',
  userChangePassword: '/api/users/change-password',
}

let authToken = null;
const invalidAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im15cnRpc2VAeW9wbWFpbC5jb20iLCJfaWQiOiI2MmI5N2M0Y2E1ZTUwOWZiMjY2ODJhMmEiLCJpYXQiOjE2NTYzMjc4MzQsImV4cCI6MTY1NjQxNDIzNH0.Ck7uI_M-t8jWHUf_GfVYaxz60eP0EGsBCm3VQd-nGFk';

describe('Register a new user', () => {
  test('User register | It responds with the newly registered user...', async () => {
    const response = await request(app)
      .post(urls.register)
      .send(fakeRegisterData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    authToken = String(response.body.token);
  });
});

describe('Logged in user profile...', () => {
  test('User profile | It responds with unauthorized user error...', async () => {
    const response = await request(app)
      .get(urls.userProfile);

    expect(response.statusCode).toBe(401);
  });

  test('User profile | It responds with logged in user details...', async () => {
    const response = await request(app)
      .get(urls.userProfile)
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.statusCode).toBe(200);
  });
});

describe('Update logged in user profile...', () => {
  test('Update user profile | It responds with unauthorized user error...', async () => {
    const response = await request(app)
      .post(urls.userProfile)
      .send(fakeProfileData);
    expect(response.statusCode).toBe(401);
  });

  test('Update user profile | It responds with auth token required...', async () => {
    const response = await request(app)
      .post(urls.userProfile)
      .send({ name: null })
      .set('Authorization', 'Bearer ');
    expect(response.statusCode).toBe(401);
  });

  test('Update user profile | It responds with invalid auth token...', async () => {
    const response = await request(app)
      .post(urls.userProfile)
      .send({ name: null })
      .set('Authorization', `Bearer ${invalidAuthToken}`);
      console.log("response: ", response.body);
    expect(response.statusCode).toBe(500);
  });

  test('Update user profile | It responds with validation error...', async () => {
    const response = await request(app)
      .post(urls.userProfile)
      .send({ name: null })
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.statusCode).toBe(422);
  });

  test('Update user profile | It responds with success...', async () => {
    const response = await request(app)
      .post(urls.userProfile)
      .send(fakeProfileData)
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.statusCode).toBe(200);
  });
});

describe('Change logged in user password...', () => {
  test('Update user password | It responds with unauthorized user error...', async () => {
    const response = await request(app)
      .post(urls.userChangePassword)
      .send({
        current_password: fakeRegisterData.password,
        new_password: fakeRegisterData.password,
      });
    expect(response.statusCode).toBe(401);
  });

  test('Update user password | It responds with validation error...', async () => {
    const response = await request(app)
      .post(urls.userChangePassword)
      .send({})
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.statusCode).toBe(422);
  });

  test('Update user password | It responds with success...', async () => {
    const response = await request(app)
      .post(urls.userChangePassword)
      .send({
        current_password: fakeRegisterData.password,
        new_password: fakeRegisterData.password,
      })
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.statusCode).toBe(200);
  });
});
