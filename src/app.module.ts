import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './Clients/client.module';
import { TenantsModule } from './Tenants/tenants.module';

@Module({
  imports: [
    ClientModule,
    TenantsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/MasterDB',{connectionName:'MasterDB'}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//
