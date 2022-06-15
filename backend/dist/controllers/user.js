"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUsers = exports.getCountries = void 0;
const users_1 = require("../utils/users");
const __1 = require("../");
const getCountries = (_req, res) => {
    const users = __1.cache.get("users");
    if (users) {
        const countries = (0, users_1.generateUsersForResponse)(users);
        return res.status(200).send({ countries });
    }
    res.status(500).send("Something was wrong");
};
exports.getCountries = getCountries;
const updateUsers = async (req, res) => {
    await (0, users_1.setNewUsers)();
    res.status(201).send("User array was successfully updated!");
};
exports.updateUsers = updateUsers;
//# sourceMappingURL=user.js.map