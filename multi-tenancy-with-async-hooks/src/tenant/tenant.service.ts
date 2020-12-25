import { Injectable } from '@nestjs/common';
import { get } from "async-local-storage";

import { QueryRunner, Repository } from 'typeorm';
import { Tenant } from './Tenant';

@Injectable()
export class TenantService {
  private tenants = {};

  constructor() {
    this.tenants['hogwarts'] = new Tenant('hogwarts', 1);
    this.tenants['castelobruxo'] = new Tenant('castelobruxo', 2);
  }

  async getTenantByName(tenantName: string): Promise<Tenant> {
    if (this.tenants[tenantName]) {
      return this.tenants[tenantName];
    }
  }

  async getTenantFromNamespace(): Promise<Tenant> {
    const tenant: string = await get("tenant");
    return this.getTenantByName(tenant);
  }

  async setCurrentTenantOnRepository<T>(
    repository: Repository<T>,
  ): Promise<void> {
    repository.query(
      `SET LOCAL wizreg.current_tenant=${(await this.getTenantFromNamespace()).tenantId};`
    );
  }

  public async setCurrentTenantOnQuerryRunner(
    queryRunner: QueryRunner,
  ): Promise<void> {
    queryRunner.query(
      `SET LOCAL wizreg.current_tenant=${(await this.getTenantFromNamespace()).tenantId};`,
      [],
    );
  }
}
