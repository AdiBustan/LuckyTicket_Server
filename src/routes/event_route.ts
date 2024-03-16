import express from "express";
const router = express.Router();
import eventController from "../controllers/event_controller";
import authMiddleware from "../common/auth_middleware";

/**
* @swagger
* tags:
*   name: Event
*   description: The Event's posts API
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
*     Event:
*       type: object
*       required:
*         - date
*         - hour
*         - location
*         - city
*         - artist
*       properties:
*         date:
*           type: string
*           description: The date of the event
*         hour:
*           type: string
*           description: The hour the event start
*         location:
*           type: string
*           description: The location of the event
*         city:
*           type: string
*           description: The city of the event
*         artist:
*           type: string
*           description: The artist in the event
*       example:
*         date: '04.08.2024'
*         hour: '20:00:00'
*         location: 'Zapa Herzeliya'
*         city: 'Herzeliya'
*         artist: 'Natan Goshen'
*/

/**
* @swagger
* /event/:
*   get:
*     summary: get all of the event's posts
*     tags: [Event]
*     security:
*       bearerAuth: []
*     responses:
*       200:
*         description: List of the posts
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Event'
*/
router.get("/", authMiddleware, eventController.get.bind(eventController));

router.get("/myEvents/", authMiddleware, eventController.getByUserId.bind(eventController));


/**
* @swagger
* /event/{_id}:
*   get:
*     summary: get event by the id
*     tags: [Event]
*     parameters:
*       - name: _id
*         in: path
*         required: true
*         description: The ID of the event to retrieve
*         schema:
*           type: string
*     security:
*       bearerAuth: []
*     responses:
*       200:
*         description: the event with the chosen id
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Event'
*/
router.get("/:id/", authMiddleware, eventController.getById.bind(eventController));

/**
* @swagger
* /event/:
*   post:
*     summary: post new event
*     tags: [Event]
*     security:
*       bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Event'
*     responses:
*       200:
*         description: The new event that posted
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Event'
*/
router.post("/", authMiddleware, eventController.post.bind(eventController));

/**
* @swagger
* /event/{_id}:
*   put:
*     summary: update existed event
*     tags: [Event]
*     parameters:
*       - name: _id
*         in: path
*         required: true
*         description: The ID of the event to update
*         schema:
*           type: string
*     security:
*       bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Event'
*     responses:
*       200:
*         description: The updated event
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Event'
*/
router.put("/:id/", authMiddleware, eventController.putById.bind(eventController));

/**
* @swagger
* /event/{_id}:
*   delete:
*     summary: delete existed event
*     tags: [Event]
*     parameters:
*       - name: _id
*         in: path
*         required: true
*         description: The ID of the event to delete
*         schema:
*           type: string
*     security:
*       bearerAuth: []
*     responses:
*       200:
*         description: The deleted event
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Event'
*/
router.delete("/:id/", authMiddleware, eventController.deleteById.bind(eventController));

export default router;