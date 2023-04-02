export default async function logout(req, res) {
  try {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).json({
          message: "There was an error logging you out.",
          error: err.message,
        });
      } else {
        res.clearCookie("connect.sid", { path: "/" });
        res.status(200).json({ message: "You have been logged out." });
      }
    });
  } catch (e) {
    res.status(400).json({
      message: "There was an error logging you out.",
      error: e.message,
    });
  }
}
