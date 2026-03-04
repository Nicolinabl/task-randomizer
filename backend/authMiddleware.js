import { User } from "./schemas.js";

// FIXME - add error handling, put accesstoken req into variable
export const authentificateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "User is logged out" });
    }
    const user = await User.findOne({ accessToken: token });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ loggedOut: true });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.errors });
  }
};
