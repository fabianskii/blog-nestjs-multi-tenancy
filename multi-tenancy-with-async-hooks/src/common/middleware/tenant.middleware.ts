import { Injectable, NestMiddleware } from "@nestjs/common";
import { set } from "async-local-storage";

@Injectable()
export class TenantMiddleware implements NestMiddleware {

  use(req: any, res: any, next: () => void): any {
    let tenantName: string;
    tenantName = req.headers.host.split(".")[0];
    set("tenant", tenantName);

    next();
  }
}
