"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("../database/data"));
const types_1 = require("../database/types");
function handleConnect(socket) {
    const io = this;
    const roomID = socket.handshake.query.roomID;
    const mark = socket.handshake.query.mark;
    const [room] = data_1.default.filter(item => { if (item.roomID === roomID)
        return true; });
    socket.join(roomID);
    if (mark === 'X') {
        room.status = types_1.Status.O_next;
        io.in(roomID).emit('update', room.btn, room.status);
    }
    socket.on('one_step', (index, mark) => {
        room.btn[index] = mark;
        const result = judge(room.btn);
        if (result === 'O')
            room.status = types_1.Status.O_won;
        if (result === 'X')
            room.status = types_1.Status.X_won;
        if (result === 'Draw')
            room.status = types_1.Status.Draw;
        if (result === 'Unsettled') {
            if (mark === 'O')
                room.status = types_1.Status.X_next;
            if (mark === 'X')
                room.status = types_1.Status.O_next;
        }
        io.in(roomID).emit('update', room.btn, room.status);
    });
    socket.on('disconnect', () => {
        room.headcount -= 1;
        if (room.headcount === 1) {
            if (room.status === types_1.Status.O_next || room.status === types_1.Status.X_next) {
                if (mark === 'O')
                    io.in(roomID).emit('update', room.btn, types_1.Status.X_won);
                if (mark === 'X')
                    io.in(roomID).emit('update', room.btn, types_1.Status.O_won);
            }
            data_1.default.some((item, index) => {
                if (item === room) {
                    data_1.default.splice(index, 1);
                    return true;
                }
            });
        }
    });
}
function judge(btn) {
    const [a, b, c, d, e, f, g, h, i] = btn;
    if (a + b + c === 'OOO' || a + b + c === 'XXX')
        return a;
    if (d + e + f === 'OOO' || d + e + f === 'XXX')
        return d;
    if (g + h + i === 'OOO' || g + h + i === 'XXX')
        return g;
    if (a + d + g === 'OOO' || a + d + g === 'XXX')
        return a;
    if (b + e + h === 'OOO' || b + e + h === 'XXX')
        return b;
    if (c + f + i === 'OOO' || c + f + i === 'XXX')
        return c;
    if (a + e + i === 'OOO' || a + e + i === 'XXX')
        return a;
    if (c + e + g === 'OOO' || c + e + g === 'XXX')
        return c;
    function drew(item) {
        if (item !== '')
            return true;
        return false;
    }
    if (btn.every(drew))
        return 'Draw';
    return 'Unsettled';
}
exports.default = handleConnect;
