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
exports.UserDataController = void 0;
const common_1 = require("@nestjs/common");
const user_data_service_1 = require("./user_data.service");
const update_user_data_dto_1 = require("./dto/update-user_data.dto");
let UserDataController = class UserDataController {
    userDataService;
    constructor(userDataService) {
        this.userDataService = userDataService;
    }
    async create(request, createUserDataDto) {
        return await this.userDataService.create(request.user.sub, createUserDataDto);
    }
    async findAll(request) {
        return this.userDataService.findAll(request.user.sub);
    }
    update(dataId, updateUserDataDto) {
        return this.userDataService.update(dataId, updateUserDataDto);
    }
    remove(dataId) {
        return this.userDataService.remove(dataId);
    }
};
exports.UserDataController = UserDataController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], UserDataController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserDataController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_data_dto_1.UpdateUserDataDto]),
    __metadata("design:returntype", void 0)
], UserDataController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserDataController.prototype, "remove", null);
exports.UserDataController = UserDataController = __decorate([
    (0, common_1.Controller)('user-data'),
    __metadata("design:paramtypes", [user_data_service_1.UserDataService])
], UserDataController);
//# sourceMappingURL=user_data.controller.js.map