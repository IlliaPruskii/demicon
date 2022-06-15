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
exports.cache = void 0;
const express_1 = __importDefault(require("express"));
const node_cache_1 = __importDefault(require("node-cache"));
const user_1 = require("./controllers/user");
const updateUsers_1 = __importDefault(require("./scheduledJobs/updateUsers"));
const users_1 = require("./utils/users");
const PORT = 8000;
const app = (0, express_1.default)();
exports.cache = new node_cache_1.default();
(0, updateUsers_1.default)();
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', user_1.getCountries);
app.post('/', user_1.updateUsers);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Example app listening on port ${PORT}`);
    yield (0, users_1.setNewUsers)();
}));
//# sourceMappingURL=index.js.map