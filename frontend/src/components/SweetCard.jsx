import React, { useState } from "react";
import { purchaseSweet, restockSweet } from "../api/sweetApi";

function SweetCard({ sweet, isAdmin, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [restockQty, setRestockQty] = useState("");

  const handlePurchase = async () => {
    try {
      setLoading(true);
      const res = await purchaseSweet(sweet._id);
      onUpdate(res.data.sweet);
    } catch (err) {
      alert(err.response?.data?.message || "Purchase failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRestock = async () => {
    if (!restockQty || restockQty <= 0) return;

    try {
      setLoading(true);
      const res = await restockSweet(sweet._id, restockQty);
      onUpdate(res.data.sweet);
      setRestockQty("");
    } catch (err) {
      alert(err.response?.data?.message || "Restock failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{sweet.name}</h3>
      <p className="text-sm text-gray-600">{sweet.category}</p>
      <p className="mt-1">₹{sweet.price}</p>

      <p className="text-sm mt-1">
        Stock:{" "}
        <span
          className={
            sweet.quantity === 0 ? "text-red-500" : "text-green-600"
          }
        >
          {sweet.quantity}
        </span>
      </p>

      {/* Purchase */}
      <button
        onClick={handlePurchase}
        disabled={sweet.quantity === 0 || loading}
        className={`mt-3 w-full py-2 text-sm rounded text-white ${
          sweet.quantity === 0 || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        Purchase
      </button>

      {/* Admin Restock */}
      {isAdmin && (
        <div className="mt-3 flex gap-2">
          <input
            type="number"
            min="1"
            value={restockQty}
            onChange={(e) => setRestockQty(e.target.value)}
            placeholder="Qty"
            className="border px-2 py-1 rounded w-full"
          />
          <button
            onClick={handleRestock}
            disabled={loading}
            className="bg-green-600 text-white px-3 rounded hover:bg-green-700"
          >
            Restock
          </button>
        </div>
      )}
    </div>
  );
}

export default SweetCard;
