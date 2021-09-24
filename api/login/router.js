"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = __importStar(require("../database/data"));
const router = express_1.default.Router();
var createResponse;
(function (createResponse) {
    createResponse["ROOM_ALREADY_EXISTS"] = "this room already exists";
    createResponse["SUCCEED"] = "succeed";
})(createResponse || (createResponse = {}));
router.post('/create', (req, res) => {
    const { roomID, passcode } = req.body;
    for (const room of data_1.default) {
        if (room.roomID === roomID) {
            res.send(createResponse.ROOM_ALREADY_EXISTS);
            return null;
        }
    }
    data_1.default.push({ roomID, passcode, headcount: 1, btn: [...data_1.start], status: data_1.Status.WAITING_FOR_OTHER_PLAYER_TO_JOIN });
    res.send(createResponse.SUCCEED);
});
var joinResponse;
(function (joinResponse) {
    joinResponse["ROOM_IS_FULL"] = "this room is full";
    joinResponse["WRONG_PASSCODE"] = "wrong passcode";
    joinResponse["ROOM_NOT_EXISTS"] = "this room does not exist";
    joinResponse["SUCCEED"] = "succeed";
})(joinResponse || (joinResponse = {}));
router.post('/join', (req, res) => {
    const { roomID, passcode } = req.body;
    for (const room of data_1.default) {
        if (room.roomID === roomID) {
            if (room.headcount === 2) {
                res.send(joinResponse.ROOM_IS_FULL);
                return null;
            }
            if (room.passcode === passcode) {
                room.headcount += 1;
                room.status = data_1.Status.O_next;
                res.send(joinResponse.SUCCEED);
                return null;
            }
            res.send(joinResponse.WRONG_PASSCODE);
            return null;
        }
    }
    res.send(joinResponse.ROOM_NOT_EXISTS);
});
exports.default = router;
