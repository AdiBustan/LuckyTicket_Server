"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const event_controller_1 = __importDefault(require("../controllers/event_controller"));
const auth_middleware_1 = __importDefault(require("../common/auth_middleware"));
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
*         image:
*           type: string
*           description: The image of the event
*       example:
*         date: '04.08.2024'
*         hour: '20:00:00'
*         location: 'Zapa Herzeliya'
*         city: 'Herzeliya'
*         artist: 'Natan Goshen'
*         image: 'something.jpg'
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
router.get("/", auth_middleware_1.default, event_controller_1.default.get.bind(event_controller_1.default));
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
router.get("/:id/", auth_middleware_1.default, event_controller_1.default.getById.bind(event_controller_1.default));
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
router.post("/", auth_middleware_1.default, event_controller_1.default.post.bind(event_controller_1.default));
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
router.put("/:id/", auth_middleware_1.default, event_controller_1.default.putById.bind(event_controller_1.default));
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
router.delete("/:id/", auth_middleware_1.default, event_controller_1.default.deleteById.bind(event_controller_1.default));
exports.default = router;
//# sourceMappingURL=event_route.js.map