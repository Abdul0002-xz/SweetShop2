import React, { useState } from "react";
import { updateSweet } from "../api/sweetApi";

function EditSweet({ sweet }) {
  const [form, setForm] = useState(sweet);

  const handleUpdate = async () => {
    await updateSweet(sweet._id, form);
    alert("Updated");
  };

  return (
    <div className="space-y-2">
      <input
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
        className="border px-2 py-1"
      />
      <button
        onClick={handleUpdate}
        className="text-sm text-indigo-600"
      >
        Update
      </button>
    </div>
  );
}

export default EditSweet;
