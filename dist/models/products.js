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
var productinfo = /** @class */ (function () {
    function productinfo() {
    }
    productinfo.prototype.index = function () {
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
                        sql = 'select * from products';
                        return [4 /*yield*/, connection.query(sql)
                            //close connection
                        ];
                    case 2:
                        result = _a.sent();
                        //close connection
                        connection.release();
                        //close connection
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error('cannot select products');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    productinfo.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM products WHERE id=($1);';
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
                        throw new Error("Could not find product ".concat(id, ". ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    productinfo.prototype.create = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()
                            //run query
                        ];
                    case 1:
                        connection = _a.sent();
                        sql = 'INSERT INTO products (product_name, product_price) VALUES ($1, $2 )  RETURNING id,product_name, product_price';
                        return [4 /*yield*/, connection.query(sql, [
                                p.product_name,
                                p.product_price
                            ])
                            //close connection
                        ];
                    case 2:
                        result = _a.sent();
                        //close connection
                        connection.release();
                        //close connection
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Could not add new product. ");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    productinfo.prototype.update = function (id, product_name, product_price) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'UPDATE products SET product_name= $1, product_price= $2 WHERE id = $3 RETURNING *';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [
                                product_name,
                                product_price,
                                id
                            ])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Could not update product ".concat(product_name, ". ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    productinfo.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "DELETE FROM products WHERE id=($1) ";
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Could not delete products ".concat(id, ", ").concat(error_1.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return productinfo;
}());
exports.default = productinfo;
