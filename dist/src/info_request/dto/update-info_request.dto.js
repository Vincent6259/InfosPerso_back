"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInfoRequestDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_info_request_dto_1 = require("./create-info_request.dto");
class UpdateInfoRequestDto extends (0, mapped_types_1.PartialType)(create_info_request_dto_1.CreateInfoRequestDto) {
}
exports.UpdateInfoRequestDto = UpdateInfoRequestDto;
//# sourceMappingURL=update-info_request.dto.js.map