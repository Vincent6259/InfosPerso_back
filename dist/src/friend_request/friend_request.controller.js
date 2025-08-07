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
exports.FriendRequestController = void 0;
const common_1 = require("@nestjs/common");
const friend_request_service_1 = require("./friend_request.service");
const create_friend_request_dto_1 = require("./dto/create-friend_request.dto");
let FriendRequestController = class FriendRequestController {
    friendRequestService;
    constructor(friendRequestService) {
        this.friendRequestService = friendRequestService;
    }
    create(createFriendRequestDto, req) {
        const user1Id = req.user.sub;
        return this.friendRequestService.create(createFriendRequestDto, user1Id);
    }
    remove(requestId) {
        return this.friendRequestService.requestRefused(requestId);
    }
};
exports.FriendRequestController = FriendRequestController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_friend_request_dto_1.CreateFriendRequestDto, Object]),
    __metadata("design:returntype", void 0)
], FriendRequestController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id/refused'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FriendRequestController.prototype, "remove", null);
exports.FriendRequestController = FriendRequestController = __decorate([
    (0, common_1.Controller)('friend-request'),
    __metadata("design:paramtypes", [friend_request_service_1.FriendRequestService])
], FriendRequestController);
//# sourceMappingURL=friend_request.controller.js.map