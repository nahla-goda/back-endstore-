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
var orders_1 = __importDefault(require("../../models/orders"));
var users_1 = __importDefault(require("../../models/users"));
var database_1 = __importDefault(require("../../database"));
var orderStore = new orders_1.default();
var userStore = new users_1.default();
describe('Order model', function () {
    it('has a create method', function () {
        expect(orderStore.create).toBeDefined();
    });
    it('index method to show list of orders', function () {
        expect(orderStore.index).toBeDefined();
    });
    it('show order by id ', function () {
        expect(orderStore.show).toBeDefined();
    });
    it('deletefrom order', function () {
        expect(orderStore.delete).toBeDefined();
    });
});
describe('Order model method', function () {
    var user = {
        email: 'nahlare@gamila.com',
        user_name: 'nahla',
        first_name: 'nahla',
        last_name: 'goda',
        password: '123q'
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userStore.create(user)];
                case 1:
                    createdUser = _a.sent();
                    user.id = createdUser.id;
                    return [2 /*return*/];
            }
        });
    }); });
    it('add method should add a order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    order = {
                        id: 1,
                        user_id: 3,
                        status: 'true'
                    };
                    return [4 /*yield*/, orderStore.create(order)];
                case 1:
                    result = _a.sent();
                    expect(result.user_id).toEqual(order.user_id);
                    return [2 /*return*/];
            }
        });
    }); });
    it('index method should return a list of orders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, orderList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    order = {
                        id: 1,
                        user_id: 3,
                        status: 'true'
                    };
                    return [4 /*yield*/, orderStore.index()];
                case 1:
                    orderList = _a.sent();
                    expect(orderList[0].user_id).toEqual(order.user_id);
                    return [2 /*return*/];
            }
        });
    }); });
    it('show method should return the  order bu id ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    order = {
                        id: 1,
                        user_id: 3,
                        status: 'true'
                    };
                    return [4 /*yield*/, orderStore.show(order.id)];
                case 1:
                    result = _a.sent();
                    expect(result.user_id).toEqual(order.user_id);
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete order method ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order, orderlist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    order = {
                        id: 1,
                        user_id: 3,
                        status: 'true'
                    };
                    return [4 /*yield*/, orderStore.delete(order.id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, orderStore.index()];
                case 2:
                    orderlist = _a.sent();
                    expect(orderlist).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, connection.query('DELETE FROM orders;')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1;')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.query('DELETE FROM users;')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;')];
                case 5:
                    _a.sent();
                    connection.release();
                    return [2 /*return*/];
            }
        });
    }); });
});
