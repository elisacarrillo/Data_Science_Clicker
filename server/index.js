import server from "./config/server";
import "./config/database";
import setRoutes from "./config/routes";

setRoutes(server);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
