import mongoose from "mongoose";

class Connection {
  constructor() {
    const url = process.env.MONGODB_URI;
    console.log("Establishing new connection with url", url);
    mongoose.Promise = global.Promise;
    mongoose.set("strictQuery", false);
    mongoose
      .connect(url)
      .then(() => {
        console.log("Mongo connection established ✅");
      })
      .catch((err) => {
        console.log("Mongo connection failed ❌");
      });
  }
}

export default new Connection();
