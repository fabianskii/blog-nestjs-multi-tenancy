import { DynamicModule } from '@nestjs/common';
import { Connection, ConnectionOptions } from 'typeorm';
import { EntityClassOrSchema } from './interfaces/entity-class-or-schema.type';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from './interfaces/typeorm-options.interface';
export declare class TypeOrmModule {
    static forRoot(options?: TypeOrmModuleOptions): DynamicModule;
    static forFeature(entities?: EntityClassOrSchema[], connection?: Connection | ConnectionOptions | string): DynamicModule;
    static forRootAsync(options: TypeOrmModuleAsyncOptions): DynamicModule;
}
