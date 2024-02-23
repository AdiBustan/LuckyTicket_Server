import express from "express";
const router = express.Router();
import eventController from "../controllers/event_controller";
import authMiddleware from "../common/auth_middleware";

router.get("/", authMiddleware, eventController.get.bind(eventController));

router.get("/:id/", authMiddleware, eventController.getById.bind(eventController));

router.post("/", authMiddleware, eventController.post.bind(eventController));

router.put("/:id/", authMiddleware, eventController.putById.bind(eventController));

router.delete("/:id/", authMiddleware, eventController.deleteById.bind(eventController));

export default router;