"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
var Status;
(function (Status) {
    Status[Status["WAITING_FOR_OTHER_PLAYER_TO_JOIN"] = 0] = "WAITING_FOR_OTHER_PLAYER_TO_JOIN";
    Status[Status["O_next"] = 1] = "O_next";
    Status[Status["X_next"] = 2] = "X_next";
    Status[Status["O_won"] = 3] = "O_won";
    Status[Status["X_won"] = 4] = "X_won";
    Status[Status["Draw"] = 5] = "Draw";
})(Status = exports.Status || (exports.Status = {}));
