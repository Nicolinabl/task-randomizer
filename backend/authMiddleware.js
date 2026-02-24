import { User } from "./schemas";

// FIXME - add error handling, put accesstoken req into variable
export const authentificateUser = async (req, res, next) => {
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
};
