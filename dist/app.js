"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./src/models/server"));
// Configurar dot.env
dotenv_1.default.config();
const server = new server_1.default();
exports.app = server.getApp();
server.listen();
//# sourceMappingURL=app.js.map