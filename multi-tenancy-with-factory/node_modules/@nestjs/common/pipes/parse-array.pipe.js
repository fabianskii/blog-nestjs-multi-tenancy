"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseArrayPipe = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../index");
const http_error_by_code_util_1 = require("../utils/http-error-by-code.util");
const shared_utils_1 = require("../utils/shared.utils");
const validation_pipe_1 = require("./validation.pipe");
const VALIDATION_ERROR_MESSAGE = 'Validation failed (parsable array expected)';
const DEFAULT_ARRAY_SEPARATOR = ',';
/**
 * Defines the built-in ParseArray Pipe
 *
 * @see [Built-in Pipes](https://docs.nestjs.com/pipes#built-in-pipes)
 *
 * @publicApi
 */
let ParseArrayPipe = class ParseArrayPipe {
    constructor(options = {}) {
        this.options = options;
        this.validationPipe = new validation_pipe_1.ValidationPipe(Object.assign({ transform: true, validateCustomDecorators: true }, options));
        const { exceptionFactory, errorHttpStatusCode = index_1.HttpStatus.BAD_REQUEST, } = options;
        this.exceptionFactory =
            exceptionFactory ||
                (error => new http_error_by_code_util_1.HttpErrorByCode[errorHttpStatusCode](error));
    }
    /**
     * Method that accesses and performs optional transformation on argument for
     * in-flight requests.
     *
     * @param value currently processed route argument
     * @param metadata contains metadata about the currently processed route argument
     */
    async transform(value, metadata) {
        if (!value && !this.options.optional) {
            throw this.exceptionFactory(VALIDATION_ERROR_MESSAGE);
        }
        else if (shared_utils_1.isNil(value) && this.options.optional) {
            return value;
        }
        if (!Array.isArray(value)) {
            if (!shared_utils_1.isString(value)) {
                throw this.exceptionFactory(VALIDATION_ERROR_MESSAGE);
            }
            else {
                try {
                    value = value
                        .trim()
                        .split(this.options.separator || DEFAULT_ARRAY_SEPARATOR);
                }
                catch (_a) {
                    throw this.exceptionFactory(VALIDATION_ERROR_MESSAGE);
                }
            }
        }
        if (this.options.items) {
            const validationMetadata = {
                metatype: this.options.items,
                type: 'query',
            };
            const toClassInstance = (item) => {
                try {
                    item = JSON.parse(item);
                }
                catch (_a) { }
                return this.validationPipe.transform(item, validationMetadata);
            };
            value = await Promise.all(value.map(toClassInstance));
        }
        return value;
    }
};
ParseArrayPipe = tslib_1.__decorate([
    index_1.Injectable(),
    tslib_1.__param(0, index_1.Optional()),
    tslib_1.__metadata("design:paramtypes", [Object])
], ParseArrayPipe);
exports.ParseArrayPipe = ParseArrayPipe;
