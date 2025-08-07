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
exports.GroupPermissionController = void 0;
const common_1 = require("@nestjs/common");
const group_permission_service_1 = require("./group-permission.service");
const create_group_permission_dto_1 = require("./dto/create-group-permission.dto");
const update_group_permission_dto_1 = require("./dto/update-group-permission.dto");
const delete_group_permission_dto_1 = require("./dto/delete-group-permission.dto");
let GroupPermissionController = class GroupPermissionController {
    groupPermissionService;
    constructor(groupPermissionService) {
        this.groupPermissionService = groupPermissionService;
    }
    async createManyByGroup(request, dto) {
        return await this.groupPermissionService.createManyByGroup(request.user.sub, dto);
    }
    async findAllByGroup(request, groupId) {
        return await this.groupPermissionService.findAllByGroup(request.user.sub, groupId);
    }
    async updateManyByGroup(request, updateGroupPermissionDto) {
        return await this.groupPermissionService.updateManyByGroup(request.user.sub, updateGroupPermissionDto);
    }
    async removeManyByGroup(request, dto) {
        return await this.groupPermissionService.removeManyByGroup(request.user.sub, dto);
    }
    async removeAllByGroup(request, groupId) {
        return await this.groupPermissionService.removeAllByGroup(request.user.sub, groupId);
    }
};
exports.GroupPermissionController = GroupPermissionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_group_permission_dto_1.CreateGroupPermissionDto]),
    __metadata("design:returntype", Promise)
], GroupPermissionController.prototype, "createManyByGroup", null);
__decorate([
    (0, common_1.Get)(':groupId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], GroupPermissionController.prototype, "findAllByGroup", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_group_permission_dto_1.UpdateGroupPermissionDto]),
    __metadata("design:returntype", Promise)
], GroupPermissionController.prototype, "updateManyByGroup", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, delete_group_permission_dto_1.DeleteGroupPermissionDto]),
    __metadata("design:returntype", Promise)
], GroupPermissionController.prototype, "removeManyByGroup", null);
__decorate([
    (0, common_1.Delete)(':groupId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], GroupPermissionController.prototype, "removeAllByGroup", null);
exports.GroupPermissionController = GroupPermissionController = __decorate([
    (0, common_1.Controller)('group-permission'),
    __metadata("design:paramtypes", [group_permission_service_1.GroupPermissionService])
], GroupPermissionController);
//# sourceMappingURL=group-permission.controller.js.map