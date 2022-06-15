"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cron = require("node-cron");
const users_1 = require("../utils/users");
const updateUsers = () => {
    const scheduledJobFunction = cron.schedule("* * * * *", async () => {
        await (0, users_1.setNewUsers)();
    });
    scheduledJobFunction.start();
};
exports.default = updateUsers;
//# sourceMappingURL=updateUsers.js.map