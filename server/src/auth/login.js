import User from "../models/User";

export default async function login(req, res) {
  try {
    const { netid } = req.body;
    const user = await User.findOne({ netid: netid });
    if (!user) {
      res.status(200).json({
        message: "User not found.",
        isAuthenticated: false,
      });
      return;
      // const user = new User({
      //   netid: netid,
      //   name: `${netid}-name`,
      //   role: "student",
      // });
      // await user.save();
    }
    req.session.user = user;
    res
      .status(200)
      .json({ user, isAuthenticated: true, message: "You are authenticated." });
  } catch (e) {
    res.status(400).json({
      message: "There was an error logging in.",
      error: e.message,
    });
  }
}
