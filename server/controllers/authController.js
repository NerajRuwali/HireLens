import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret_change_me";
const JWT_EXPIRES_IN = "7d";

const AUTH_EMAIL = (process.env.AUTH_EMAIL || "demo@airesume.com").toLowerCase();
const AUTH_PASSWORD = process.env.AUTH_PASSWORD || "Demo@123";

export const login = async (req, res) => {
  try {
    const email = (req.body?.email || "").toLowerCase().trim();
    const password = String(req.body?.password || "");

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    if (email !== AUTH_EMAIL || password !== AUTH_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const user = {
      id: "demo-user",
      name: "Demo User",
      email: AUTH_EMAIL,
      role: "user",
    };

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.status(200).json({
      success: true,
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    console.error("Auth login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
};

export const me = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      user: req.user,
    },
  });
};

