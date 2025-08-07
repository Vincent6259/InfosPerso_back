"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleArray = exports.getRandomNumber = void 0;
const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max);
};
exports.getRandomNumber = getRandomNumber;
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
exports.shuffleArray = shuffleArray;
//# sourceMappingURL=utils.js.map