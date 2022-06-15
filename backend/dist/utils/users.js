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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUsersForResponse = exports.setNewUsers = exports.getUsers = void 0;
const axios_1 = __importDefault(require("axios"));
const __1 = require("..");
const URL = 'https://randomuser.me/api';
const generateUsers = (data) => {
    const users = data.results.map((user) => {
        const { gender, name: { title, first, last }, location: { country }, email } = user;
        return {
            gender,
            name: `${title} ${first} ${last}`,
            country,
            email
        };
    });
    return users;
};
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get(URL);
        const users = generateUsers(data);
        return users;
    }
    catch (e) {
        console.log(e);
    }
});
exports.getUsers = getUsers;
const setNewUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, exports.getUsers)();
    if (users) {
        __1.cache.set('users', users);
    }
});
exports.setNewUsers = setNewUsers;
const getCountries = (data) => {
    const countries = data.reduce((value, user) => {
        const { country } = user;
        if (value.includes(country)) {
            return value;
        }
        return [...value, country];
    }, []);
    return countries;
};
const generateUsersForResponse = (data) => {
    const countryNames = getCountries(data);
    const usersForResponse = countryNames.map((country) => ({
        name: country,
        users: data.filter((user) => user.country === country)
    }));
    return usersForResponse;
};
exports.generateUsersForResponse = generateUsersForResponse;
//# sourceMappingURL=users.js.map