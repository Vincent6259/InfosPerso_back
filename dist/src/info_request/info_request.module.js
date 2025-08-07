"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoRequestModule = void 0;
const common_1 = require("@nestjs/common");
const info_request_service_1 = require("./info_request.service");
const info_request_controller_1 = require("./info_request.controller");
const notification_service_1 = require("../notification/notification.service");
let InfoRequestModule = class InfoRequestModule {
};
exports.InfoRequestModule = InfoRequestModule;
exports.InfoRequestModule = InfoRequestModule = __decorate([
    (0, common_1.Module)({
        controllers: [info_request_controller_1.InfoRequestController],
        providers: [info_request_service_1.InfoRequestService, notification_service_1.NotificationService],
    })
], InfoRequestModule);
//# sourceMappingURL=info_request.module.js.map