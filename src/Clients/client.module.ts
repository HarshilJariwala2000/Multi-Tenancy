import { Module, NestModule } from "@nestjs/common";
import { TenantConnection } from "src/Tenants/tenant.connection";
import { TenantsModule } from "src/Tenants/tenants.module";
import { ClientController } from "./client.controller";


@Module({
      imports: [
        TenantsModule
      ],
      providers: [
        TenantConnection
      ],
      controllers: [ClientController],
})

export class ClientModule{}