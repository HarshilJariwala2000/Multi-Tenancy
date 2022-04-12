import { Module, NestModule } from "@nestjs/common";
import { TenantConnection } from "src/Tenants/tenant.connection";
//import { TenantConnectionFactory } from "src/Tenants/tenant.connection.factory";
//import { TenantModelProviders } from "src/Tenants/tenant.model.provider";
import { TenantsModule } from "src/Tenants/tenants.module";
import { TenantService } from "src/Tenants/tenants.service";
import { ClientController } from "./client.controller";
//import { ClientService } from "./client.service";

@Module({
    imports: [
      TenantsModule
    ],
    providers: [
      
      TenantConnection
    ],
    controllers: [ClientController],
  })
  export class ClientModule /*implements NestModule*/ {
    // configure(context: MiddlewareConsumer) {
    //   context.apply(TenantAwareMiddleware).forRoutes('/users');
    // }
  }