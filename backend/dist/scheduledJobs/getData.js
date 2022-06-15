"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
// cron.schedule('* * * * *', function() {
//   console.log('running a task every minute');
// });
const getData = () => {
    const scheduledJobFunction = node_cron_1.default.schedule("* * * * *", () => {
        console.log("I'm executed on a schedule!");
    });
    scheduledJobFunction.start();
};
exports.default = getData;
//# sourceMappingURL=getData.js.map