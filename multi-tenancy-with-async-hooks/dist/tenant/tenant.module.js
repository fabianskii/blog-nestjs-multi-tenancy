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
Object.defineProperty(exports, '__esModule', { value: true });
exports.TenantModule = void 0;
const common_1 = require('@nestjs/common');
const core_1 = require('@nestjs/core');
const tenant_service_1 = require('./tenant.service');
const tenantFactoryFromRequest = {
  provide: 'TENANT',
  scope: common_1.Scope.REQUEST,
  useFactory: (req) => {
    const tenant = req.headers.host.split('.')[0];
    return tenant;
  },
  inject: [core_1.REQUEST],
};
let TenantModule = class TenantModule {};
TenantModule = __decorate(
  [
    common_1.Module({
      providers: [tenant_service_1.TenantService, tenantFactoryFromRequest],
      exports: ['TENANT'],
    }),
  ],
  TenantModule,
);
exports.TenantModule = TenantModule;
//# sourceMappingURL=tenant.module.js.map
