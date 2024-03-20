import express from "express";
const router = express.Router();
import eventController from "../controllers/event_controller";
import authMiddleware from "../common/auth_middleware";
import user_controller from "../controllers/user_controller";

/**
* @swagger
* tags:
*   name: User
*   description: The users API
*/


/**
* @swagger
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*/

/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - username
*         - email
*         - password
*         - phone
*       properties:
*         username:
*           type: string
*           description: The name of the user
*         email:
*           type: string
*           description: The mail of the user
*         password:
*           type: string
*           description: The password the user have chosen
*         phone:
*           type: string
*           description: The contact info of the user
*         
*       example:
*         username: 'Israel Israeli'
*         email: 'israel@gmail.com'
*         password: 'isr123'
*         phone: '058-1234567'
*/


/**
* @swagger
* /user/:
*   get:
*     summary: get user by user id
*     tags: [User]
*     security:
*       bearerAuth: []
*     responses:
*       200:
*         description: The connected user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.get("/", authMiddleware, user_controller.getByUserId.bind(eventController));


/**
* @swagger
* /user/:
*   post:
*     summary: post new user
*     tags: [User]
*     security:
*       bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The new user that registered
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.post("/", authMiddleware, user_controller.post.bind(eventController));

/**
* @swagger
* /user/:
*   put:
*     summary: update info of the connected user
*     tags: [User]
*     security:
*       bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The user that was updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.put("/:id/", authMiddleware, user_controller.updateById.bind(eventController));

export default router;