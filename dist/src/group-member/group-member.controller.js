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
exports.GroupMemberController = void 0;
const common_1 = require("@nestjs/common");
const group_member_service_1 = require("./group-member.service");
const create_group_member_dto_1 = require("./dto/create-group-member.dto");
const delete_group_member_dto_1 = require("./dto/delete-group-member.dto");
let GroupMemberController = class GroupMemberController {
    groupMemberService;
    constructor(groupMemberService) {
        this.groupMemberService = groupMemberService;
    }
    createOne(createGroupMemberDto) {
        return this.groupMemberService.createOne(createGroupMemberDto);
    }
    findAllByGroup(group_id) {
        if (!group_id || group_id <= 0) {
            throw new common_1.HttpException('Group ID is incorrect', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.groupMemberService.findAllByGroup(group_id);
    }
    remove(deleteGroupMemberDto) {
        return this.groupMemberService.remove(deleteGroupMemberDto);
    }
};
exports.GroupMemberController = GroupMemberController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_group_member_dto_1.CreateGroupMemberDto]),
    __metadata("design:returntype", Promise)
], GroupMemberController.prototype, "createOne", null);
__decorate([
    (0, common_1.Get)(':group_id'),
    __param(0, (0, common_1.Param)('group_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GroupMemberController.prototype, "findAllByGroup", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_group_member_dto_1.DeleteGroupMemberDto]),
    __metadata("design:returntype", Promise)
], GroupMemberController.prototype, "remove", null);
exports.GroupMemberController = GroupMemberController = __decorate([
    (0, common_1.Controller)('group-member'),
    __metadata("design:paramtypes", [group_member_service_1.GroupMemberService])
], GroupMemberController);
//# sourceMappingURL=group-member.controller.js.map