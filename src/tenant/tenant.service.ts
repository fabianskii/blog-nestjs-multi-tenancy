import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';
import { Tenant } from './Tenant';

@Injectable()
export class TenantService {
  private tenant: Tenant;
  private tenants = {};

  constructor(@Inject('TENANT') tenant: string) {
    this.tenants['hogwarts'] = new Tenant('hogwarts', 1);
    this.tenants['castelobruxo'] = new Tenant('castelobruxo', 2);

    if (this.tenants[tenant]) {
      this.tenant = this.tenants[tenant];
    } else {
      throw Error('Unknown tenant.');
    }
  }

  async getTenantByName(tenantName: string): Promise<Tenant> {
    if (this.tenants[tenantName]) {
      return this.tenants[tenantName];
    }
  }

  async setCurrentTenantOnRepository<T>(
    repository: Repository<T>,
  ): Promise<void> {
    repository.query(
      `SET LOCAL wizreg.current_tenant=${this.tenant.tenantId};`,
      [],
    );
  }

  public async setCurrentTenantOnQuerryRunner(
    queryRunner: QueryRunner,
  ): Promise<void> {
    queryRunner.query(
      `SET LOCAL wizreg.current_tenant=${this.tenant.tenantId};`,
      [],
    );
  }
}
