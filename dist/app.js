"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var handle_1 = __importDefault(require("./handleerror/handle"));
var orders_1 = __importDefault(require("./routes/api/orders"));
var products_route_1 = __importDefault(require("./routes/api/products.route"));
var route_1 = __importDefault(require("./routes/route"));
var app = (0, express_1.default)();
var port = 1504;
app.use(express_1.default.json());
// set end point
app.get('/', function (req, res) {
    res.send('hello to my second project ');
});
//models routes
(0, route_1.default)(app);
(0, products_route_1.default)(app);
(0, orders_1.default)(app);
//handle error
app.use(handle_1.default);
//coonect to 1504 port
app.listen(port, function () {
    console.log('server running on http://localhost:1504');
});
exports.default = app;
