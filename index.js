"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const socket_1 = __importDefault(require("./api/game/socket"));
const PORT = 3002;
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server);
io.on('connection', socket_1.default);
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
