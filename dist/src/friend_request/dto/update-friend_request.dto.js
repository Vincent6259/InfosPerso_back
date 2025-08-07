"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFriendRequestDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_friend_request_dto_1 = require("./create-friend_request.dto");
class UpdateFriendRequestDto extends (0, mapped_types_1.PartialType)(create_friend_request_dto_1.CreateFriendRequestDto) {
}
exports.UpdateFriendRequestDto = UpdateFriendRequestDto;
//# sourceMappingURL=update-friend_request.dto.js.map