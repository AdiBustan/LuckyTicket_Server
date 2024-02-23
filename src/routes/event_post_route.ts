import express from "express";
const router = express.Router();
import eventPostController from "../controllers/event_post_controller";
import authMiddleware from "../common/auth_middleware";

router.get("/", authMiddleware, eventPostController.get.bind(eventPostController));

router.get("/:id", authMiddleware, eventPostController.getById.bind(eventPostController));

router.post("/", authMiddleware, eventPostController.post.bind(eventPostController));

router.put("/:id", authMiddleware, eventPostController.putById.bind(eventPostController));

router.delete("/:id", authMiddleware, eventPostController.deleteById.bind(eventPostController));

export default router;