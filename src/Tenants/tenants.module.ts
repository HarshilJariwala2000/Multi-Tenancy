import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantService } from './tenants.service';
import { Tenant, TenantSchema } from './../schemas/tenants.schema';
import { TenantConnection } from './tenant.connection';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tenant.name, schema: TenantSchema }],'MasterDB'),
    ConfigModule
  ],
  providers: [TenantService,TenantConnection,
   ],
  exports: [
    TenantConnection,TenantService,
  ],
})
export class TenantsModule {}