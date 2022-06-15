import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { TenantConnection } from 'src/Tenants/tenant.connection';

@Controller()
export class ClientController {
    constructor(private readonly tenantConnection: TenantConnection) { }

    @Get('findById')
    findById(@Query('collectionName') collectionName: string, @Query('id') id: string) {
        return this.tenantConnection.findById(collectionName, id)
    }

    @Get('findAll')
    findAll(@Query('collectionName') collectionName: string) {
        return this.tenantConnection.findAll(collectionName);
    }

    @Post('insertOne')
    insert(@Body() body:any){
        return this.tenantConnection.insert(body.collectionName,body.data);
    }

    @Post('insertMany')
    insertMany(@Body() body: any) {
        return this.tenantConnection.insertMany(body.collectionName, body.data);
    }

    @Post('update')
    update(@Body() body: any) {
        const findQuery = {}
        const updateQuery = { "$set": body.data }
        return this.tenantConnection.updateMany(body.collectionName, findQuery, updateQuery)
    }

    @Post('updateMany')
    updateMany(@Body() body: any) {
        const findQuery = { "name": body.data.name }
        const updateQuery = { "$set": body.data }
        return this.tenantConnection.updateMany(body.collectionName, findQuery, updateQuery)
    }

    @Delete('delete')
    delete(@Body() body: any) {
        const deleteQuery = { "name": body.data.name }
        return this.tenantConnection.delete(body.collectionName, deleteQuery)
    }

    @Delete('deleteMany')
    deleteMany(@Body() body: any) {
        const deleteQuery = { "name": body.data.name }
        return this.tenantConnection.deleteMany(body.collectionName, deleteQuery)
    }

}