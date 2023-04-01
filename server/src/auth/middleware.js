import User from "../models/User";

export default async function authenticate(req, res) {
  try {
    if (!req.session || !req.session.user) {
      res
        .status(200)
        .json({
          isAuthenticated: false,
          message: "You are not authenticated.",
        });
    } else {
      const user = await User.findOne({ netid: req.session.user.netid });
      if (!user) {
        res.status(200).json({
          isAuthenticated: false,
          message: "You are not authenticated.",
        });
      } else {
        req.user = user;
        res.status(200).json({
          isAuthenticated: true,
          message: "You are authenticated.",
          user: user,
        });
      }
    }
  } catch (e) {
    res.status(400).json({
      message: "There was an error authenticating.",
      error: e.message,
    });
  }
}
