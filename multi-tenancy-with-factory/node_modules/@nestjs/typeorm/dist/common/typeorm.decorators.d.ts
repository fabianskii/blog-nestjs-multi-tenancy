import { Connection, ConnectionOptions } from 'typeorm';
import { EntityClassOrSchema } from '../interfaces/entity-class-or-schema.type';
export declare const InjectRepository: (entity: EntityClassOrSchema, connection?: string) => (target: object, key: string | symbol, index?: number | undefined) => void;
export declare const InjectConnection: (connection?: Connection | ConnectionOptions | string) => ParameterDecorator;
export declare const InjectEntityManager: (connection?: Connection | ConnectionOptions | string) => ParameterDecorator;
