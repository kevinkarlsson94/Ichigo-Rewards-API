import express from "express";
import { getRewards, patchRewards } from "../controllers/rewards.js";

const router = express.Router();

router.get("/:id", getRewards);
router.patch("/:id/rewards/:date/redeem", patchRewards);

export default router;
