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
    insert(@Body() body: any) {
        return this.tenantConnection.insert(body.collectionName, body.data);
    }

    @Post('insertMany')
    insertMany(@Body() body: any) {
        return this.tenantConnection.insertMany(body.collectionName, body.data);
    }

    @Post('updateById')
    update(@Body() body: any, @Query('id') id: string) {
        const findQuery = {"_id":id}
        const updateQuery = { "$set": body.data }
        return this.tenantConnection.update(body.collectionName, findQuery, updateQuery)
    }

    @Post('updateManyById')
    updateMany(@Body() body: any) {
        const findQuery = { "_id": { "$in": body.ids } }
        const updateQuery = { "$set": body.data }
        return this.tenantConnection.updateMany(body.collectionName, findQuery, updateQuery)
    }

    @Delete('deleteById')
    delete(@Body() body: any,  @Query('id') id: string) {
        const deleteQuery = { "_id": id }
        return this.tenantConnection.delete(body.collectionName, deleteQuery)
    }

    @Delete('deleteManyById')
    deleteMany(@Body() body: any) {
        const deleteQuery = { "_id": { "$in": body.ids } }
        return this.tenantConnection.deleteMany(body.collectionName, deleteQuery)
    }

}