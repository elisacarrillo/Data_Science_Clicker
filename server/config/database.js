import mongoose from "mongoose";

class Connection {
  constructor() {
    const url =
      process.env.MONGODB_URI ||
      `mongodb+srv://admin:xwmGC0L4xV8oD2s5@atlascluster.8d3bxjl.mongodb.net/ds-clicker-db?retryWrites=true&w=majority`;
    console.log("Establish new connection with url", url);
    mongoose.Promise = global.Promise;
    mongoose.set("strictQuery", false);
    mongoose.connect(url);
  }
}

export default new Connection();
