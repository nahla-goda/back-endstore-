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
var database_1 = __importDefault(require("../../database"));
var users_1 = __importDefault(require("../../models/users"));
var userstore = new users_1.default();
describe('users Model', function () {
    it('should have an index method', function () {
        expect(userstore.index).toBeDefined();
    });
    it('should have a show method', function () {
        expect(userstore.show).toBeDefined();
    });
    it('should have a create method', function () {
        expect(userstore.create).toBeDefined();
    });
    it('should have a delete method', function () {
        expect(userstore.delete).toBeDefined();
    });
    it('should have a authicate method', function () {
        expect(userstore.authenticate).toBeDefined();
    });
});
describe('Test User Model ', function () {
    var user = {
        email: 'nahlaa@gamila.com',
        user_name: 'nahla',
        first_name: 'nahla',
        last_name: 'goda',
        password: '123q'
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userstore.create(user)];
                case 1:
                    createdUser = _a.sent();
                    user.id = createdUser.id;
                    return [2 /*return*/];
            }
        });
    }); });
    it('Authenticate method should return the authenticated user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var authenticatedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userstore.authenticate(user.email, user.password)];
                case 1:
                    authenticatedUser = _a.sent();
                    expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.email).toBe(user.email);
                    expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.user_name).toBe(user.user_name);
                    return [2 /*return*/];
            }
        });
    }); });
    it('INDEX method should return a list of users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var userList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userstore.index()];
                case 1:
                    userList = _a.sent();
                    expect(userList[0].user_name).toEqual('nahla');
                    return [2 /*return*/];
            }
        });
    }); });
    it('show method should return user when called with ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var returnedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userstore.show(user.id)];
                case 1:
                    returnedUser = _a.sent();
                    expect(returnedUser.id).toBe(user.id);
                    expect(returnedUser.email).toBe(user.email);
                    expect(returnedUser.user_name).toBe(user.user_name);
                    expect(returnedUser.first_name).toBe(user.first_name);
                    expect(returnedUser.last_name).toBe(user.last_name);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Delete One method should delete user from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
        var deletedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userstore.delete(user.id)];
                case 1:
                    deletedUser = _a.sent();
                    expect(deletedUser.id).toBe(user.id);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create method should add a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userstore.create({
                        email: 'nona@test.com',
                        user_name: 'nona',
                        first_name: 'nona',
                        last_name: 'goda',
                        password: 'qqqq'
                    })];
                case 1:
                    result = _a.sent();
                    expect(result.user_name).toEqual('nona');
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connection = _a.sent();
                    sql = 'DELETE FROM users;';
                    return [4 /*yield*/, connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.query(sql)];
                case 3:
                    _a.sent();
                    connection.release();
                    return [2 /*return*/];
            }
        });
    }); });
});
