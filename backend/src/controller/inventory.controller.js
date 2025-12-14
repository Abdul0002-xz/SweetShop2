import {Sweets} from "../model/sweets.model.js";

/**
 * POST /api/sweets/:id/purchase
 * Purchase a sweet (decrease quantity)
 */
export const purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;

    const sweet = await Sweets.findById(id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: "Sweet is out of stock" });
    }

    sweet.quantity -= 1;
    await sweet.save();

    res.status(200).json({
      message: "Sweet purchased successfully",
      sweet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST /api/sweets/:id/restock
 * Restock a sweet (Admin only)
 */
export const restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Restock quantity must be greater than 0" });
    }

    const sweet = await Sweets.findById(id);

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    sweet.quantity += Number(quantity);
    await sweet.save();

    res.status(200).json({
      message: "Sweet restocked successfully",
      sweet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
