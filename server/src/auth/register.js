import User from "../models/User";

export default async function register(req, res) {
  try {
    const { netid } = req.body;
    const user = new User({ netid: netid });
    await user.save();
    req.session.user = user;
    res.json(user);
  } catch (e) {
    res.status(400).json({
      message: "There was an error registering your account",
      error: e.message,
    });
  }
}
