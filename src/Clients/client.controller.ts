import { Controller, Delete, Get, Post } from '@nestjs/common';
import { TenantConnection } from 'src/Tenants/tenant.connection';
//import { ClientService } from './client.service';
//import { AppService } from './app.service';

@Controller()
export class ClientController{
    constructor(private readonly tenantConnection: TenantConnection) {}

    @Get('find')
    find() {
    return this.tenantConnection.findAll();
    }

    @Post('update')
    updatemany(){
        return this.tenantConnection.updatemany();
    }

    @Post('insert')
    insertmany(){
        return this.tenantConnection.insertmany();
    }

    @Delete('delete')
    deletemany(){
        return this.tenantConnection.deletemany();
    }

    // @Post('updateDelete')
    // updateAndDelete(){
    //     return this.tenantConnection.updateAndDelete();
    // }
}