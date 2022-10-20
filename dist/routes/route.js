"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vaildtionacess_1 = require("../middleware/vaildtionacess");
var users_route_1 = require("./api/users.route");
function usertoute(app) {
    app.post('/users', users_route_1.create);
    app.get('/users/:id', vaildtionacess_1.veriftmytoken, users_route_1.show);
    app.get('/users/', vaildtionacess_1.veriftmytoken, users_route_1.index);
    app.patch('/users/:id', vaildtionacess_1.veriftmytoken, users_route_1.update);
    app.delete('/users/:id/', vaildtionacess_1.veriftmytoken, users_route_1.deleteOne);
    app.post('/users/auth', users_route_1.authenticate);
}
exports.default = usertoute;
