"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./user/user.module");
const notification_module_1 = require("./notification/notification.module");
const conversation_module_1 = require("./conversation/conversation.module");
const prisma_module_1 = require("../prisma/prisma.module");
const group_member_module_1 = require("./group-member/group-member.module");
const user_data_module_1 = require("./user_data/user_data.module");
const authentication_module_1 = require("./authentication/authentication.module");
const group_module_1 = require("./group/group.module");
const friendship_module_1 = require("./friendship/friendship.module");
const friend_request_module_1 = require("./friend_request/friend_request.module");
const group_permission_module_1 = require("./group-permission/group-permission.module");
const permission_module_1 = require("./permission/permission.module");
const info_request_module_1 = require("./info_request/info_request.module");
const data_label_module_1 = require("./data_label/data_label.module");
const request_module_1 = require("./request/request.module");
const chat_gateway_1 = require("./websocket/chat.gateway");
const sse_controller_1 = require("./sse.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            user_module_1.UserModule,
            notification_module_1.NotificationModule,
            conversation_module_1.ConversationModule,
            prisma_module_1.PrismaModule,
            user_data_module_1.UserDataModule,
            group_member_module_1.GroupMemberModule,
            authentication_module_1.AuthenticationModule,
            group_module_1.GroupModule,
            friendship_module_1.FriendshipModule,
            friend_request_module_1.FriendRequestModule,
            group_permission_module_1.GroupPermissionModule,
            permission_module_1.PermissionModule,
            info_request_module_1.InfoRequestModule,
            data_label_module_1.DataLabelModule,
            request_module_1.RequestModule,
        ],
        controllers: [app_controller_1.AppController, sse_controller_1.SseController],
        providers: [app_service_1.AppService, chat_gateway_1.ChatGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map