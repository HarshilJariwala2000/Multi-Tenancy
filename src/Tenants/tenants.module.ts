import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//import { CatsController } from './c.controller';
import { TenantService } from './tenants.service';
import { Tenant, TenantSchema } from './../schemas/tenants.schema';
import { TenantConnection } from './tenant.connection';
//import { TenantConnectionFactory } from './tenant.connection.factory';
//import { TenantModelProviders } from './tenant.model.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tenant.name, schema: TenantSchema }],'MasterDB')
  ],
  providers: [TenantService,TenantConnection,
   ],
  exports: [
    TenantConnection,TenantService
  ],
})
export class TenantsModule {}