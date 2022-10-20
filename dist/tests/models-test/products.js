"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var products_1 = __importDefault(require("../../models/products"));
var ProductStore = new products_1.default();
describe("products Model", function () {
    it("should have an index method to show all products in store", function () {
        expect(ProductStore.index).toBeDefined();
    });
    it("should have a show method ", function () {
        expect(ProductStore.show).toBeDefined();
    });
    it("should have a create method", function () {
        expect(ProductStore.create).toBeDefined();
    });
    it("should have a update method", function () {
        expect(ProductStore.update).toBeDefined();
    });
    it("should have a delete method", function () {
        expect(ProductStore.delete).toBeDefined();
    });
});
