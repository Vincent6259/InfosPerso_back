"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const referenceDataLabels_1 = require("../referenceDataLabels");
const createDataLabel = async () => {
    const dataLabels = [];
    for (let i = 0; i < referenceDataLabels_1.default.length; i++) {
        const id = referenceDataLabels_1.default[i].id;
        dataLabels.push(await __1.prisma.data_label.upsert({
            where: { id },
            update: {},
            create: {
                id,
                label: referenceDataLabels_1.default[i].label,
            },
        }));
    }
    return dataLabels;
};
exports.default = createDataLabel;
//# sourceMappingURL=dataLabel.js.map