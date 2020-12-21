import { QueryRunner, Repository } from 'typeorm';
import { Tenant } from './Tenant';
export declare class TenantService {
  private tenant;
  private tenants;
  constructor(tenant: string);
  getTenantByName(tenantName: string): Promise<Tenant>;
  setCurrentTenantOnRepository<T>(repository: Repository<T>): Promise<void>;
  setCurrentTenantOnQuerryRunner(queryRunner: QueryRunner): Promise<void>;
}
