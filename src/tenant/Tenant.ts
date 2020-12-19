export class Tenant {
  name: string;
  tenantId: number;

  constructor(name: string, tenantId: number) {
    this.name = name;
    this.tenantId = tenantId;
  }
}
