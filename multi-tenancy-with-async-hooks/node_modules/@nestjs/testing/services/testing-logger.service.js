"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingLogger = void 0;
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
const common_1 = require("@nestjs/common");
class TestingLogger extends common_1.Logger {
    constructor() {
        super('Testing');
    }
    log(message) { }
    warn(message) { }
    error(message, trace) {
        return common_1.Logger.error(message, trace, 'ExceptionHandler');
    }
}
exports.TestingLogger = TestingLogger;
