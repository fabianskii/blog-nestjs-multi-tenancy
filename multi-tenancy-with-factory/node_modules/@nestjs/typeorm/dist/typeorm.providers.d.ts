import { Provider } from '@nestjs/common';
import { Connection, ConnectionOptions } from 'typeorm';
import { EntityClassOrSchema } from './interfaces/entity-class-or-schema.type';
export declare function createTypeOrmProviders(entities?: EntityClassOrSchema[], connection?: Connection | ConnectionOptions | string): Provider[];
