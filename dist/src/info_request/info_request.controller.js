"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoRequestController = void 0;
const common_1 = require("@nestjs/common");
const info_request_service_1 = require("./info_request.service");
const create_info_request_dto_1 = require("./dto/create-info_request.dto");
let InfoRequestController = class InfoRequestController {
    infoRequestService;
    constructor(infoRequestService) {
        this.infoRequestService = infoRequestService;
    }
    create(req, dto) {
        const user1Id = req.user.sub;
        return this.infoRequestService.create(user1Id, dto);
    }
    remove(requestId) {
        return this.infoRequestService.requestRefused(requestId);
    }
};
exports.InfoRequestController = InfoRequestController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_info_request_dto_1.CreateInfoRequestDto]),
    __metadata("design:returntype", void 0)
], InfoRequestController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id/refused'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InfoRequestController.prototype, "remove", null);
exports.InfoRequestController = InfoRequestController = __decorate([
    (0, common_1.Controller)('info-request'),
    __metadata("design:paramtypes", [info_request_service_1.InfoRequestService])
], InfoRequestController);
//# sourceMappingURL=info_request.controller.js.map