import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import bcrypt from 'bcryptjs';

dotenv.config({
    path:".env"
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
}, { timestamps: true });   

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getAccessToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );

  return token;
};

userSchema.methods.getRefreshToken = function () {
  const token = jwt.sign(
      {
          _id: this._id,
          role : this.role
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXIPRY
      }
  );
  return token;
}

export const User = mongoose.model('User', userSchema);