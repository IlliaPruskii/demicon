"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUsers = exports.getCountries = void 0;
const users_1 = require("../utils/users");
const __1 = require("..");
const getCountries = (req, res) => {
    const users = __1.cache.get('users');
    const countries = (0, users_1.generateUsersForResponse)(users);
    res.status(200).send({ countries });
};
exports.getCountries = getCountries;
const updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, users_1.setNewUsers)();
    res.status(201).send('User array was successfully updated!');
});
exports.updateUsers = updateUsers;
//# sourceMappingURL=user.js.map