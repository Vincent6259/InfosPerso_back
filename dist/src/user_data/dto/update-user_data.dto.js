"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDataDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_data_dto_1 = require("./create-user_data.dto");
class UpdateUserDataDto extends (0, mapped_types_1.PartialType)(create_user_data_dto_1.CreateUserDataDto) {
}
exports.UpdateUserDataDto = UpdateUserDataDto;
//# sourceMappingURL=update-user_data.dto.js.map