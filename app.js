"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./api/login/router"));
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());

app.use('/api/login', router_1.default);
app.use((req, res) => {
    (0, fs_1.readFile)(path_1.default.join(__dirname, './index.html'), (err, data) => {
        if (err) {
            res.status(500).send('error');
            console.log(err);
        }
        res.setHeader('Content-Type', 'text/html');
        res.send(data);
    });
});
exports.default = app;
