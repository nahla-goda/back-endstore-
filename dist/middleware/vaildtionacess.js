"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.veriftmytoken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var veriftmytoken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        // console.log(authorizationHeader)
        var token = authorizationHeader.split(' ')[1];
        // console.log(token)
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
    }
};
exports.veriftmytoken = veriftmytoken;
