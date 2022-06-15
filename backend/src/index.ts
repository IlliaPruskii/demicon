import * as express from "express";
import * as NodeCache from "node-cache";
import {getCountries, updateUsers} from "./controllers/user";
import scheduledUsersUpdate from "./scheduledJobs/updateUsers";
import {setNewUsers} from "./utils/users";

const PORT = 8000;

const app = express();
export const cache = new NodeCache();

scheduledUsersUpdate();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", getCountries);

app.post("/", updateUsers);

app.listen(PORT, async () => {
  console.log(`Example app listening on port ${PORT}`);
  await setNewUsers();
});
