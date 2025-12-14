import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const route = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50">

      {/* 1️⃣ Hero Section */}
      <section className="bg-indigo-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Sweet Shop Management System
          </h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
            A modern platform to manage sweets inventory, purchases, and admin
            operations efficiently.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
              Browse Sweets
            </button>
            <button className="border border-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-500 transition">
              Admin Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* 2️⃣ About Section */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            About the System
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            This system helps sweet shop owners and administrators efficiently
            manage products, track stock availability, and provide a seamless
            purchasing experience for customers.
          </p>
        </div>
      </section>

      {/* 3️⃣ Features Section */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-10">
            Key Features
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 rounded-xl shadow bg-gray-50">
              <h3 className="font-semibold mb-2">Inventory Management</h3>
              <p className="text-sm text-gray-600">
                Add, update, and manage sweets with real-time stock control.
              </p>
            </div>
            <div className="p-6 rounded-xl shadow bg-gray-50">
              <h3 className="font-semibold mb-2">Secure Authentication</h3>
              <p className="text-sm text-gray-600">
                Role-based login for admins and customers.
              </p>
            </div>
            <div className="p-6 rounded-xl shadow bg-gray-50">
              <h3 className="font-semibold mb-2">Smart Purchases</h3>
              <p className="text-sm text-gray-600">
                Prevent purchases when items are out of stock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4️⃣ How It Works Section */}
      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-10">
            How It Works
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <h3 className="font-semibold mb-2">1. Login</h3>
              <p className="text-sm text-gray-600">
                Users and admins log in securely.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">2. Manage / Browse</h3>
              <p className="text-sm text-gray-600">
                Admins manage inventory, users browse sweets.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">3. Purchase</h3>
              <p className="text-sm text-gray-600">
                Users purchase available sweets seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ Call To Action Section */}
      <section className="py-16 px-4 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to Manage Your Sweet Shop?
          </h2>
          <p className="text-indigo-100 mb-6">
            Start managing inventory and sales with ease today.
          </p>
          <button onClick={()=>route("/login")} className="bg-white text-indigo-600 px-8 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* 6️⃣ Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center text-sm">
        © 2025 Sweet Shop Management System. All rights reserved.
      </footer>

    </div>
  );
}

export default Home;
