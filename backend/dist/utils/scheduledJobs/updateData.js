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
const node_cron_1 = __importDefault(require("node-cron"));
const __1 = require("..");
const users_1 = require("../utils/users");
// cron.schedule('* * * * *', function() {
//   console.log('running a task every minute');
// });
const getData = () => {
    const scheduledJobFunction = node_cron_1.default.schedule("* * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield (0, users_1.getUsers)();
        __1.cache.set('users', users);
        console.log("I'm executed on a schedule!");
    }));
    scheduledJobFunction.start();
};
exports.default = getData;
//# sourceMappingURL=updateData.js.map