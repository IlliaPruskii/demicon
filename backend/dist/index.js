"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const express = require("express");
const NodeCache = require("node-cache");
const user_1 = require("./controllers/user");
const updateUsers_1 = require("./scheduledJobs/updateUsers");
const users_1 = require("./utils/users");
const PORT = 8000;
const app = express();
exports.cache = new NodeCache();
(0, updateUsers_1.default)();
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get("/", user_1.getCountries);
app.post("/", user_1.updateUsers);
app.listen(PORT, async () => {
    console.log(`Example app listening on port ${PORT}`);
    await (0, users_1.setNewUsers)();
});
//# sourceMappingURL=index.js.map