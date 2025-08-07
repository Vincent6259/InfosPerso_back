"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = exports.ConvType = void 0;
var ConvType;
(function (ConvType) {
    ConvType["group"] = "group";
    ConvType["friend"] = "friend";
})(ConvType || (exports.ConvType = ConvType = {}));
class Conversation {
    id;
    type;
    members;
    messages;
}
exports.Conversation = Conversation;
//# sourceMappingURL=conversation.entity.js.map