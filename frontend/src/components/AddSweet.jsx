import React, { useState } from "react";
import { addSweet } from "../api/sweetApi";

function AddSweet() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    
    await addSweet(form);
    alert("Sweet added");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 space-y-3"
    >
      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key}
          value={form[key]}
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />
      ))}

      <button type="submit" className="bg-indigo-600 text-white w-full py-2 rounded">
        Add Sweet
      </button>
    </form>
  );
}

export default AddSweet;
