/**
 * @swagger
 * /users/profile:
 *   get:
 *     description: Get user profile
 *     operationId: user_profile
 *     security:
 *     - Basic: []
 *     tags:
 *     - User Profile
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
 *               example: 'OK'
 *             data:
 *                $ref: '#/definitions/User' 
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
 *               example: User not found.
 *
 *   post:
 *     description: Update user profile
 *     operationId: update_profile
 *     security:
 *     - Basic: []
 *     tags:
 *     - User Profile
 *     parameters:
 *       - name: name
 *         description: User full name.
 *         required: false
 *         in: formData
 *         type: string
 *         x-example: ''
 *       - name: phone
 *         description: User phone number.
 *         required: false
 *         in: formData
 *         type: string
 *         x-example: ''
 *       - name: country_name
 *         description: User country name.
 *         required: false
 *         in: formData
 *         type: string
 *         x-example: ''
 *       - name: country_code
 *         description: User country code.
 *         required: false
 *         in: formData
 *         type: string
 *         x-example: ''
 *       - name: dob
 *         description: User date of birth.
 *         required: false
 *         in: formData
 *         type: date
 *         x-example: ''
 *       - name: gender
 *         description: User gender.
 *         required: false
 *         in: formData
 *         type: string
 *         x-example: 'Male, Female, Other'
 *       - name: marital_status
 *         description: User marital status.
 *         required: false
 *         in: formData
 *         type: string
 *         x-example: 'Married, Single, Widowed, Separated, Divorced'
 *       - name: location
 *         description: User location or address.
 *         required: false
 *         in: formData
 *         type: string
 *         x-example: ''
 *       - name: lat
 *         description: Latitude.
 *         required: false
 *         in: formData
 *         type: string
 *         x-example: ''
 *       - name: lng
 *         description: Longitude.
 *         required: false
 *         in: formData
 *         type: string
 *         x-example: ''
 *       - name: about
 *         description: More about user.
 *         required: false
 *         in: formData
 *         type: string
 *         x-example: ''
 *       - name: profile_image
 *         description: User profile picture full url.
 *         required: false
 *         in: formData
 *         type: string
 *         x-example: 'http://image.url'
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
 *               example: 'Profile has been updated successfully.'
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
 *               example: User not found.
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
 *                  name:
 *                    type: string
 *                    example: name is not allowed to be empty
 *                  phone:
 *                    type: string
 *                    example: phone is not allowed to be empty
*/

/**
 * @swagger
 * /users/change-password:
 *   post:
 *     description: Change user password
 *     operationId: change_password
 *     security:
 *     - Basic: []
 *     tags:
 *     - User Profile
 *     parameters:
 *       - name: current_password
 *         description: Current password.
 *         required: true
 *         in: formData
 *         type: string
 *         x-example: ''
 *       - name: new_password
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
 *               example: 'Password has been updated successfully.'
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
 *               example: User not found.
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
 *                  current_password:
 *                    type: string
 *                    example: current_password is required
 *                  new_password:
 *                    type: string
 *                    example: new_password is required
*/