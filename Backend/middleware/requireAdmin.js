import jwt from "jsonwebtoken";

export default function requireAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Unauthorized" });

  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    req.admin = {
      ...decoded,
      id: decoded.id || decoded._id,
      _id: decoded.id || decoded._id
    };
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Admin Token" });
  }
}