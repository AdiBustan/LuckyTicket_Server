import express from "express";
const router = express.Router();
import eventController from "../controllers/event_controller";
import authMiddleware from "../common/auth_middleware";
import user_controller from "../controllers/user_controller";

router.get("/", authMiddleware, user_controller.getByUserId.bind(eventController));

router.post("/", authMiddleware, user_controller.post.bind(eventController));

router.put("/:id/", authMiddleware, user_controller.updateById.bind(eventController));

export default router;