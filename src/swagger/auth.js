/**
 *  @swagger
 *  definitions:
 *    User:
 *	    type: object
 *	    properties:
 *	      _id:
 *	        type: string
 *	      email:
 *	        type: string
 *	      name:
 *	        type: string
 *	      phone:
 *	        type: number
 *	      country_code:
 *	        type: number
 *	      country_name:
 *	        type: string
 *	      dob:
 *	        type: string
 *	      gender:
 *	        type: string
 *	      marital_status:
 *	        type: string
 *	      location:
 *	        type: string
 *	      lat:
 *	        type: string
 *	      lng:
 *	        type: string
 *	      about:
 *	        type: string
 *	      profile_image:
 *	        type: string
 *	      is_deleted:
 *	        type: boolean
 *	      last_login:
 *	        type: string
 *	      is_verified_by_phone:
 *	        type: boolean
 *	      is_verified_by_email:
 *	        type: boolean
 *	      is_admin:
 *	        type: boolean
 *	      is_active:
 *	        type: boolean
 *	      has_password_set:
 *	        type: boolean
 *	      createdAt:
 *	        type: string
 *	      updatedAt:
 *	        type: string
*/

/**
 * @swagger
 * /auth/register:
 *   post:
 *     description: Register in to the application.
 *     operationId: auth_register
 *     security:
 *     - Basic: []
 *     tags:
 *     - Auth
 *     parameters:
 *       - name: email
 *         description: Email id of the user.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: ''
 *       - name: password
 *         description: Password of the user.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: ''
 *       - name: phone
 *         description: phone of the user.
 *         required: true
 *         in: formData
 *         type: number
 *         x-example: ''
 *       - name: name
 *         description: Full name of the user.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: ''
 *     responses:
 *       200:
 *         description: Logged in user details
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Your information have been saved, Please check your email for further steps'
 *             token:
 *               type: string
 *               example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InViYWxkb2tAeW9wbWFpbC5jb20iLCJfaWQiOiI2MjcyMjk0M2M2ZTMxMGQ3N2VkMWFhNTYiLCJpYXQiOjE2NTE2NDg4MzUsImV4cCI6MTY1MTczNTIzNX0.QsdlOSykqXLtVcjmrFVU1cAs8pV2jxv1UaSVunEA0WU'   
 *             data:
 *               $ref: '#/definitions/User'
 *       422:
 *         description: Unprocessable Entity
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: email or phone already exist.
*/

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Login in to the application.
 *     operationId: auth_login
 *     security:
 *     - Basic: []
 *     tags:
 *     - Auth
 *     parameters:
 *       - name: email
 *         description: email address of the user for the account registration.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: 'example@example.com'
 *       - name: password
 *         description: password of the user.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: ''
 *     responses:
 *       200:
 *         description: Logged in user details
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'OK'
 *             token:
 *               type: string
 *               example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhhbmRyaW5lZEB5b3BtYWlsLmNvbSIsIl9pZCI6IjYyNzIyZjhkNmMxMTFiYTg0NjdlNDcwZSIsImlhdCI6MTY1MTY1MDYxMSwiZXhwIjoxNjUxNzM3MDExfQ.BXwGH-qX7cP4nVPe3sUndRDDDoh25yLVQ1j4xwqKd98'
 *             data:
 *               $ref: '#/definitions/User'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: Please enter a valid email and password.
*/

/**
 * @swagger
 * /auth/social/login:
 *   post:
 *     description: Login by the social media like facebook, google, and twitter.
 *     operationId: social_login
 *     security:
 *     - Basic: []
 *     tags:
 *     - Auth
 *     parameters:
 *       - name: email
 *         description: Social media email address.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: ''
 *       - name: name
 *         description: Name of the user.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: ''
 *       - name: providerId
 *         description: Social media provider ID like (facebookId, googleID, etc).
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: ''
 *       - name: provider
 *         description: Name of social media provider like (facebook, google, twitter).
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: ''
 *       - name: accessToken
 *         description: Social media access token.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: ''
 *     responses:
  *       200:
 *         description: Logged in user details
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: 'Success'
 *             data:
 *               $ref: '#/definitions/User'
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *               example: 400
 *             message:
 *               type: string
 *               example: The request was unacceptable, often due to missing a required parameter.
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     description: Forgot user password
 *     operationId: auth_forgot_password
 *     security:
 *     - Basic: []
 *     tags:
 *     - Auth
 *     parameters:
 *       - name: email
 *         description: email address of the user.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: 'example@example.com'
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'An email has been sent with the instructions for resetting the password.'
 *       404:
 *         description: Not Found
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: The provided email address does not exists
 *       422:
 *          description: Unprocessable Entity
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: boolean
 *                example: false
 *              message:
 *                type: string
 *                example: Validation Error
 *              errors:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                    example: email is required
*/

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     description: Reset forgot user password
 *     operationId: auth_reset_forgot_password
 *     security:
 *     - Basic: []
 *     tags:
 *     - Auth
 *     parameters:
 *       - name: email
 *         description: Email address of the user.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: 'example@example.com'
 *       - name: forgot_password_otp
 *         description: Forgot password OTP.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: '123456'
 *       - name: password
 *         description: New password of the user.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: ''
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Your password has been reset successfully.'
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: The forgot password OTP is not valid.
 *       404:
 *         description: Not Found
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: The provided email address does not exists
 *       422:
 *          description: Unprocessable Entity
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: boolean
 *                example: false
 *              message:
 *                type: string
 *                example: Validation Error
 *              errors:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                    example: email is required
 *                  forgot_password_otp:
 *                    type: string
 *                    example: forgot_password_otp is required
 *                  password:
 *                    type: string
 *                    example: password is required
*/

/**
 * @swagger
 * /auth/email-verification-otp:
 *   post:
 *     description: Send email verification OTP
 *     operationId: auth_email_verification_otp
 *     security:
 *     - Basic: []
 *     tags:
 *     - Auth
 *     parameters:
 *       - name: email
 *         description: Email address of the user.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: 'example@example.com'
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'An email has been sent containing the email verification OTP.'
 *       404:
 *         description: Not Found
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: The provided email address does not exists
 *       422:
 *          description: Unprocessable Entity
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: boolean
 *                example: false
 *              message:
 *                type: string
 *                example: Validation Error
 *              errors:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                    example: email is required
*/

/**
 * @swagger
 * /auth/email-verification:
 *   post:
 *     description: Email verification
 *     operationId: auth_email_verification
 *     security:
 *     - Basic: []
 *     tags:
 *     - Auth
 *     parameters:
 *       - name: email
 *         description: Email address of the user.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: 'example@example.com'
 *       - name: otp
 *         description: Email verification OTP.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: '123456'
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'Email has been verified successfully.'
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: The email verification OTP is not valid.
 *       404:
 *         description: Not Found
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: The provided email address does not exists
 *       422:
 *          description: Unprocessable Entity
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: boolean
 *                example: false
 *              message:
 *                type: string
 *                example: Validation Error
 *              errors:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                    example: email is required
 *                  otp:
 *                    type: string
 *                    example: otp is required
*/

/**
 * @swagger
 * /auth/phone-verification-otp:
 *   post:
 *     description: Send phone verification OTP
 *     operationId: auth_phone_verification_otp
 *     security:
 *     - Basic: []
 *     tags:
 *     - Auth
 *     parameters:
 *       - name: phone
 *         description: Phone number of the user.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: '9898989898'
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: 'An SMS has been sent containing the phone verification OTP.'
 *       404:
 *         description: Not Found
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: The provided phone number does not exists.
 *       422:
 *          description: Unprocessable Entity
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: boolean
 *                example: false
 *              message:
 *                type: string
 *                example: Validation Error
 *              errors:
 *                type: object
 *                properties:
 *                  phone:
 *                    type: string
 *                    example: phone is required
*/

/**
 * @swagger
 * /auth/phone-verification:
 *   post:
 *     description: Phone verification
 *     operationId: auth_phone_verification
 *     security:
 *     - Basic: []
 *     tags:
 *     - Auth
 *     parameters:
 *       - name: email
 *         description: Phone number of the user.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: '9898989898'
 *       - name: otp
 *         description: Phone verification OTP.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: '123456'
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: Phone has been verified successfully.
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: The phone verification OTP is not valid.
 *       404:
 *         description: Not Found
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: The provided phone number does not exists.
 *       422:
 *          description: Unprocessable Entity
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: boolean
 *                example: false
 *              message:
 *                type: string
 *                example: Validation Error
 *              errors:
 *                type: object
 *                properties:
 *                  phone:
 *                    type: string
 *                    example: phone is required
 *                  otp:
 *                    type: string
 *                    example: otp is required
*/