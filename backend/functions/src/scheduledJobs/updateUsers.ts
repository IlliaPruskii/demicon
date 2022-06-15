import * as cron from "node-cron";
import {setNewUsers} from "../utils/users";

const updateUsers = () => {
  const scheduledJobFunction = cron.schedule("* * * * *", async () => {
    await setNewUsers();
  });

  scheduledJobFunction.start();
};

export default updateUsers;
