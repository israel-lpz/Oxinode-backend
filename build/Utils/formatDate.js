"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
exports.formatDate = (date) => {
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().padStart(4, '0');
    return `${hour}:${minutes}:${seconds}  ${day}/${month}/${year}`;
};
