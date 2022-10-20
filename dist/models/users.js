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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var _a = process.env, BCRYPT_PASSWORD = _a.pepper, SALT_ROUNDS = _a.salt;
var usersinfo = /** @class */ (function () {
    function usersinfo() {
    }
    //async index to show all user in database
    usersinfo.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()
                            //run query
                        ];
                    case 1:
                        connection = _a.sent();
                        sql = 'select  id ,email,user_name,first_name,last_name, password from users';
                        return [4 /*yield*/, connection.query(sql)
                            //close connection
                        ];
                    case 2:
                        result = _a.sent();
                        //close connection
                        connection.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error('cannot select users');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // show users by id
    usersinfo.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM users WHERE id=($1);';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error('Could not find user');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // create new user in database
    //open connection
    //run query
    //hash password
    //get result
    //close connection
    usersinfo.prototype.create = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, hash, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'INSERT INTO users (email, user_name ,first_name ,last_name ,password) VALUES($1, $2, $3, $4,$5) RETURNING *';
                        hash = bcrypt_1.default.hashSync(u.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS, 10));
                        return [4 /*yield*/, connection.query(sql, [
                                u.email,
                                u.user_name,
                                u.first_name,
                                u.last_name,
                                hash
                            ])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        console.log(err_3);
                        throw new Error("Could not add new user. ");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //update user
    usersinfo.prototype.update = function (id, userr) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user_name, first_name, last_name, password, sql, connection, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = userr.email, user_name = userr.user_name, first_name = userr.first_name, last_name = userr.last_name, password = userr.password;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        sql = "UPDATE users \n      SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 \n      WHERE id=$6 \n      RETURNING id, email, user_name, first_name, last_name";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [
                                email,
                                user_name,
                                first_name,
                                last_name,
                                password,
                                id
                            ])];
                    case 3:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        err_4 = _a.sent();
                        throw new Error("Could not update user ".concat(first_name, " ").concat(last_name, ". ").concat(err_4));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //authticate with email and password for user
    usersinfo.prototype.authenticate = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, hashPassword, userInfo, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'SELECT password FROM users WHERE email=$1';
                        return [4 /*yield*/, connection.query(sql, [email])];
                    case 2:
                        result = _a.sent();
                        if (!(result.rows.length > 0)) return [3 /*break*/, 4];
                        hashPassword = result.rows[0].password;
                        if (!bcrypt_1.default.compareSync("".concat(password).concat(BCRYPT_PASSWORD), hashPassword)) return [3 /*break*/, 4];
                        return [4 /*yield*/, connection.query('SELECT id, email, user_name, first_name, last_name FROM users WHERE email=($1)', [email])];
                    case 3:
                        userInfo = _a.sent();
                        return [2 /*return*/, userInfo.rows[0]];
                    case 4:
                        connection.release();
                        return [2 /*return*/, null];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw new Error("Unable to login: ".concat(error_1.message));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //delete user from database
    usersinfo.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "DELETE FROM users \n                WHERE id=($1) \n                RETURNING id, email, user_name, first_name, last_name";
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Could not delete user ".concat(id, ", ").concat(error_2.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return usersinfo;
}());
exports.default = usersinfo;
