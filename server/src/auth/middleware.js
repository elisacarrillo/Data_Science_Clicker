import User from "../models/User";

export default async function authenticate(req, res) {
  try {
    if (!req.session || !req.session.user) {
      res.status(401).json({ error: "You are not authenticated." });
    } else {
      const user = await User.findOne({ netid: req.session.user.netid });
      if (!user) {
        res.status(401).json({ error: "You are not authenticated." });
      }
      req.user = user;
      res
        .status(200)
        .json({ message: "You are authenticated.", netid: user.netid });
      // next();
    }
  } catch (e) {
    res.status(400).json({
      message: "There was an error authenticating.",
      error: e.message,
    });
  }
  // try {
  //   if (!req.session || !req.session.user) {
  //     res.status(401).json({ error: "You are not authenticated." });
  //   } else {
  //     const user = await User.findOne({ netid: req.session.user.netid });
  //     if (!user) {
  //       res.status(401).json({ error: "You are not authenticated." });
  //     } else {
  //       req.user = user;
  //       res
  //         .status(200)
  //         .json({ message: "You are authenticated.", netid: user.netid });
  //     }
  //   }
  //   next();
  // } catch (e) {
  //   res.status(400).json({
  //     message: "There was an error authenticating.",
  //     error: e.message,
  //   });
  // }
}
