import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './Clients/client.module';
import { TenantsModule } from './Tenants/tenants.module';
import { ConfigModule } from '@nestjs/config';
require('dotenv').config()

@Module({
  imports: [
    ClientModule,
    TenantsModule,
    MongooseModule.forRoot(process.env.MASTER_DB_URI, { connectionName: 'MasterDB' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//
