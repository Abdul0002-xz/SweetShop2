import React, { useEffect, useState } from "react";
import { getAllSweets } from "../api/sweetApi";
import SweetCard from "./SweetCard.jsx";

function Sweets({ isAdmin }) {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllSweets()
      .then((res) => setSweets(res.data))
      .finally(() => setLoading(false));
  }, []);

  const updateSweet = (updatedSweet) => {
    setSweets((prev) =>
      prev.map((s) =>
        s._id === updatedSweet._id ? updatedSweet : s
      )
    );
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading sweets...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sweets?.map((sweet) => (
        <SweetCard
          key={sweet._id}
          sweet={sweet}
          isAdmin={isAdmin}
          onUpdate={updateSweet}
        />
      ))}
    </div>
  );
}

export default Sweets;
