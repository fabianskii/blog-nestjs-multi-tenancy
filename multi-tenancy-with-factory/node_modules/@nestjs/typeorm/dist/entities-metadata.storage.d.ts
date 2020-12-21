import { Connection, ConnectionOptions } from 'typeorm';
import { EntityClassOrSchema } from './interfaces/entity-class-or-schema.type';
declare type ConnectionToken = Connection | ConnectionOptions | string;
export declare class EntitiesMetadataStorage {
    private static readonly storage;
    static addEntitiesByConnection(connection: ConnectionToken, entities: EntityClassOrSchema[]): void;
    static getEntitiesByConnection(connection: ConnectionToken): EntityClassOrSchema[];
}
export {};
