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
var products_1 = __importDefault(require("../../models/products"));
var ProductStore = new products_1.default();
describe('products Model', function () {
    it('should have an index method to show all products in store', function () {
        expect(ProductStore.index).toBeDefined();
    });
    it('should have a show method ', function () {
        expect(ProductStore.show).toBeDefined();
    });
    it('should have a create method', function () {
        expect(ProductStore.create).toBeDefined();
    });
    it('should have a delete method', function () {
        expect(ProductStore.delete).toBeDefined();
    });
});
describe('Test product Model ', function () {
    var product = {
        product_name: 'jeans',
        product_price: 100
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var createproduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ProductStore.create(product)];
                case 1:
                    createproduct = _a.sent();
                    product.id = createproduct.id;
                    return [2 /*return*/];
            }
        });
    }); });
    it('INDEX method should return a list of products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var productlist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ProductStore.index()];
                case 1:
                    productlist = _a.sent();
                    expect(productlist[0].product_name).toEqual('jeans');
                    return [2 /*return*/];
            }
        });
    }); });
    it('show method should return product when called with ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var returnedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ProductStore.show(product.id)];
                case 1:
                    returnedUser = _a.sent();
                    expect(returnedUser.id).toBe(product.id);
                    expect(returnedUser.product_name).toBe(product.product_name);
                    expect(returnedUser.product_price).toBe(product.product_price);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Delete One method should delete product from DB', function () { return __awaiter(void 0, void 0, void 0, function () {
        var productlist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ProductStore.delete(product.id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, ProductStore.index()];
                case 2:
                    productlist = _a.sent();
                    expect(productlist).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create method should add a product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ProductStore.create({
                        product_name: 'phones',
                        product_price: 1002
                    })];
                case 1:
                    result = _a.sent();
                    expect(result.product_name).toEqual('phones');
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
                    sql = 'DELETE  FROM products;';
                    return [4 /*yield*/, connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;')];
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
