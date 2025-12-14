import express from "express";
import {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
} from "../controller/sweets.controller.js";

import {
  purchaseSweet,
  restockSweet,
} from "../controller/inventory.controller.js";


import { isAdmin } from "../middleware/admin.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:id/purchase", verifyJWT, purchaseSweet);
router.post("/:id/restock", verifyJWT, isAdmin, restockSweet);

/**
 * POST /api/sweets
 * Admin only
 */
router.post("/add", verifyJWT, isAdmin, addSweet);

/**
 * GET /api/sweets
 * Public
 */
router.get("/getAll", getAllSweets);

/**
 * GET /api/sweets/search
 * Public
 */
router.get("/search", searchSweets);

/**
 * PUT /api/sweets/:id
 * Admin only
 */
router.put("/:id", verifyJWT, isAdmin, updateSweet);

/**
 * DELETE /api/sweets/:id
 * Admin only
 */
router.delete("/:id", verifyJWT, isAdmin, deleteSweet);

export default router;
