import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, msg: "Not authorized, please login again" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = token_decode.id;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ success: false, msg: "Token verification failed" });
  }
};

export default authUser;