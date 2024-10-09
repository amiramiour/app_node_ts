/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with a hashed password
 *     parameters:
 *       - in: body
 *         name: user
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             role:
 *               type: boolean
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Error registering user
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     description: Login a user and return a JWT token
 *     parameters:
 *       - in: body
 *         name: user
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Error logging in
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout a user
 *     description: Logout a user by informing the client to delete the token
 *     responses:
 *       200:
 *         description: Successfully logged out
 */