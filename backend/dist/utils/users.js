"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUsersForResponse = exports.setNewUsers = exports.getUsers = void 0;
const axios_1 = require("axios");
const __1 = require("..");
const URL = "https://randomuser.me/api";
const generateUsers = (data) => {
    const users = data.results.map((user) => {
        const { gender, name: { title, first, last }, location: { country }, email, } = user;
        return {
            gender,
            name: `${title} ${first} ${last}`,
            country,
            email,
        };
    });
    return users;
};
const getUsers = async () => {
    try {
        const { data } = await axios_1.default.get(URL);
        const users = generateUsers(data);
        return users;
    }
    catch (e) {
        console.log(e);
    }
};
exports.getUsers = getUsers;
const setNewUsers = async () => {
    const users = await (0, exports.getUsers)();
    if (users) {
        __1.cache.set("users", users);
    }
};
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
        users: data.filter((user) => user.country === country),
    }));
    return usersForResponse;
};
exports.generateUsersForResponse = generateUsersForResponse;
//# sourceMappingURL=users.js.map