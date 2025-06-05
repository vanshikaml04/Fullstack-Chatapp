import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  console.log("JWT_SECRET on sign:", process.env.JWT_SECRET);  // <-- Added log here

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
 
//process.env.NODE_ENV !== "development"