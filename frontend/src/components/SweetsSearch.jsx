import React, { useState } from "react";
import { searchSweets } from "../api/sweetApi";

function SweetSearch() {
  const [searchType, setSearchType] = useState("name"); // name | category | price
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");

      let params = {};

      if (searchType === "name") {
        if (!query.trim()) return;
        params.name = query;
      }

      if (searchType === "category") {
        if (!query.trim()) return;
        params.category = query;
      }

      if (searchType === "price") {
        if (!minPrice && !maxPrice) return;
        params.minPrice = minPrice;
        params.maxPrice = maxPrice;
      }

      const res = await searchSweets(params);
      setResults(res.data);
    } catch (err) {
      setError("Failed to fetch search results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">

      {/* Search Controls */}
      <div className="p-4 space-y-3">

        {/* Select */}
        <select
          value={searchType}
          onChange={(e) => {
            setSearchType(e.target.value);
            setQuery("");
            setMinPrice("");
            setMaxPrice("");
            setResults([]);
          }}
          className="border px-3 py-2 rounded w-full sm:w-60"
        >
          <option value="name">Search by Name</option>
          <option value="category">Search by Category</option>
          <option value="price">Search by Price Range</option>
        </select>

        {/* Inputs */}
        <div className="flex gap-2">
          {(searchType === "name" || searchType === "category") && (
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Enter ${searchType}`}
              className="border px-3 py-2 rounded w-full"
            />
          )}

          {searchType === "price" && (
            <>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min Price"
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max Price"
                className="border px-3 py-2 rounded w-full"
              />
            </>
          )}

          <button
            onClick={handleSearch}
            className="bg-indigo-600 text-white px-5 rounded"
          >
            Search
          </button>
        </div>
      </div>

      {/* States */}
      {loading && (
        <p className="text-center text-gray-500 mt-6">
          Searching sweets...
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 mt-6">
          {error}
        </p>
      )}

      {!loading && results.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No sweets found.
        </p>
      )}

      {/* Results */}
      <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((sweet) => (
          <div
            key={sweet._id}
            className="bg-white p-4 rounded shadow"
          >
            <h3 className="font-semibold">{sweet.name}</h3>
            <p className="text-sm text-gray-600">{sweet.category}</p>
            <p className="mt-1">₹{sweet.price}</p>
            <p className="text-sm">
              Stock:{" "}
              <span
                className={
                  sweet.quantity === 0
                    ? "text-red-500"
                    : "text-green-600"
                }
              >
                {sweet.quantity}
              </span>
            </p>

            <button
              disabled={sweet.quantity === 0}
              className={`mt-2 w-full py-1.5 rounded text-white text-sm ${
                sweet.quantity === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SweetSearch;
