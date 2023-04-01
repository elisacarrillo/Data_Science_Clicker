import User from "../models/User";

export default async function login(req, res) {
  try {
    const { netid } = req.body;
    const user = await User.findOne({ netid: netid });
    if (!user) {
      res.status(401).json({ error: "You are not authenticated." });
    }
    req.session.user = user;
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({
      message: "There was an error logging in.",
      error: e.message,
    });
  }
}
