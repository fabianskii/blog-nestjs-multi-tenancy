import { ArgumentMetadata, PipeTransform } from '../index';
/**
 * Defines the built-in DefaultValue Pipe
 *
 * @see [Built-in Pipes](https://docs.nestjs.com/pipes#built-in-pipes)
 *
 * @publicApi
 */
export declare class DefaultValuePipe<T = any, R = any> implements PipeTransform<T, T | R> {
    private readonly defaultValue;
    constructor(defaultValue: R);
    transform(value?: T, _metadata?: ArgumentMetadata): T | R;
}
