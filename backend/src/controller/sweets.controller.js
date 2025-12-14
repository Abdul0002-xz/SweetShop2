// controllers/sweet.controller.js
import {Sweets} from "../model/sweets.model.js";

/**
 * POST /api/sweets
 * Add a new sweet (Admin)
 */
export const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || price == null || quantity == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const sweet = await Sweets.create({
      name,
      category,
      price,
      quantity,
    });

    res.status(201).json({
      message: "Sweet added successfully",
      sweet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/sweets
 * Get all sweets
 */
export const getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweets.find().sort({ createdAt: -1 });
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/sweets/search
 * Search sweets by name, category, price range
 */
export const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweets.find(query);
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * PUT /api/sweets/:id
 * Update sweet details (Admin)
 */
export const updateSweet = async (req, res) => {
  try {
    const { id } = req.params;

    const sweet = await Sweets.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.status(200).json({
      message: "Sweet updated successfully",
      sweet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE /api/sweets/:id
 * Delete a sweet (Admin only)
 */
export const deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;

    const sweet = await Sweets.findByIdAndDelete(id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.status(200).json({
      message: "Sweet deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
