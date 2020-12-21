'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.TenantService = void 0;
const common_1 = require('@nestjs/common');
const Tenant_1 = require('./Tenant');
let TenantService = class TenantService {
  constructor(tenant) {
    this.tenants = {};
    this.tenants['hogwarts'] = new Tenant_1.Tenant('hogwarts', 1);
    this.tenants['castelobruxo'] = new Tenant_1.Tenant('castelobruxo', 2);
    if (this.tenants[tenant]) {
      this.tenant = this.tenants[tenant];
    } else {
      throw Error('Unknown tenant.');
    }
  }
  async getTenantByName(tenantName) {
    if (this.tenants[tenantName]) {
      return this.tenants[tenantName];
    }
  }
  async setCurrentTenantOnRepository(repository) {
    repository.query(
      `SET LOCAL wizreg.current_tenant=${this.tenant.tenantId};`,
      [],
    );
  }
  async setCurrentTenantOnQuerryRunner(queryRunner) {
    queryRunner.query(
      `SET LOCAL wizreg.current_tenant=${this.tenant.tenantId};`,
      [],
    );
  }
};
TenantService = __decorate(
  [
    common_1.Injectable(),
    __param(0, common_1.Inject('TENANT')),
    __metadata('design:paramtypes', [String]),
  ],
  TenantService,
);
exports.TenantService = TenantService;
//# sourceMappingURL=tenant.service.js.map
