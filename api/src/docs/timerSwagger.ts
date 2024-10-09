/**
 * @swagger
 * /submit-reaction-time:
 *   post:
 *     summary: Submit a reaction time
 *     description: Submit a reaction time for a user
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token
 *       - in: body
 *         name: time
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             time:
 *               type: number
 *     responses:
 *       201:
 *         description: Reaction time submitted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /get-reaction-times:
 *   get:
 *     summary: Get reaction times
 *     description: Retrieve reaction times for a user
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token
 *     responses:
 *       200:
 *         description: List of reaction times
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: string
 *                   time:
 *                     type: number
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */