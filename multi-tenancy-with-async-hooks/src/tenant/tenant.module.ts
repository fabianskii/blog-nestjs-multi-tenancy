import { Module } from '@nestjs/common';

import { TenantService } from './tenant.service';

@Module({
  providers: [TenantService],
})
export class TenantModule {}
