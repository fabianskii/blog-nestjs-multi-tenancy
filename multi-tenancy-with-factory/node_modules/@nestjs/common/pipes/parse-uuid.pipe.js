"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseUUIDPipe = void 0;
const tslib_1 = require("tslib");
const decorators_1 = require("../decorators");
const index_1 = require("../index");
const http_error_by_code_util_1 = require("../utils/http-error-by-code.util");
const is_uuid_1 = require("../utils/is-uuid");
let ParseUUIDPipe = class ParseUUIDPipe {
    constructor(options) {
        options = options || {};
        const { exceptionFactory, errorHttpStatusCode = index_1.HttpStatus.BAD_REQUEST, version, } = options;
        this.version = version;
        this.exceptionFactory =
            exceptionFactory ||
                (error => new http_error_by_code_util_1.HttpErrorByCode[errorHttpStatusCode](error));
    }
    async transform(value, metadata) {
        if (!is_uuid_1.isUUID(value, this.version)) {
            throw this.exceptionFactory(`Validation failed (uuid ${this.version ? 'v' + this.version : ''} is expected)`);
        }
        return value;
    }
};
ParseUUIDPipe = tslib_1.__decorate([
    index_1.Injectable(),
    tslib_1.__param(0, decorators_1.Optional()),
    tslib_1.__metadata("design:paramtypes", [Object])
], ParseUUIDPipe);
exports.ParseUUIDPipe = ParseUUIDPipe;
