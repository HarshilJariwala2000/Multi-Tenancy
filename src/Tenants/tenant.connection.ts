import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import {Connection,Model} from "mongoose";
import mongoose from "mongoose";
import { TenantService } from "./tenants.service";
import { TenantDocument } from "src/schemas/tenants.schema";
import { ClientDocument, ClientSchema } from "src/schemas/client.schema";
import { InjectConnection } from "@nestjs/mongoose";
import { REQUEST } from "@nestjs/core";
import e, { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class TenantConnection {
    private _tenantId: string | string[];

    constructor(
        private tenantService: TenantService,
        @Inject(REQUEST) private request: Request
    ) {}
    
    async getConnection(): Promise<Connection> {
        //Get TenantID from Header
        this._tenantId = this.request.headers['tenantid'];

        // Get the tenant details from the database
        const tenant = await this.tenantService.findByName(this._tenantId);
        console.log(tenant);

        // Validation check if tenant exist
        if (!tenant) {
            throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND);
        }

        //Get the underlying mongoose connections
        const connections: Connection[] = mongoose.connections;

        // Find existing connection
        const foundConn = connections.find((con: Connection) => {
            return con.name === `${tenant.alias}`;
        });

        // Check if connection exist and is ready to execute
        if (foundConn && foundConn.readyState === 1) {
            console.log('found connection'); 
            return foundConn;
        }

        // Create a new connection
        console.log('new connection');
        return await this.createConnection(tenant);
    }

    private async createConnection(tenant: TenantDocument): Promise<Connection> {
        // Create or Return a mongo connection
        const uri = `mongodb://${tenant.host}:${tenant.port}/${tenant.alias}?`+`replicaSet=rs0`;
        console.log(uri);
        const db = mongoose.createConnection(uri);
        console.log('created connection');
        return db;

    }

    private async modelProvider(){
        const db = await this.getConnection();
        const session = await db.startSession();

        return {
            "database": db.model('Client', ClientSchema),
            "session":session
        }
        
    }

    //Find All
    async findAll() {
        const model1 = (await this.modelProvider()).database;
        return model1.find({});        
    }

    //Update
    async updatemany(){
        const model1 = (await this.modelProvider()).database;
        const session = (await this.modelProvider()).session;

        session.startTransaction();
        try{
            await model1.updateMany(
                {},
                {$set:{"name":"changed12345"}},
            ).session(session)
            await session.commitTransaction();
    }catch(e){
        console.log('Failed');
        console.log(e);

        await session.abortTransaction();

    }finally{
        console.log('closing transaction')
        session.endSession();
    }
    }

    //Insert
    async insertmany(){
        const model1 =  (await this.modelProvider()).database;
        const session =  (await this.modelProvider()).session;

        session.startTransaction();
        try{
        
            await model1.insertMany([
                {"name":"123"},
                {"name":"dfg"}
            ],{
                "session":session
            })

            await session.commitTransaction();
    }catch(e){
        console.log('Failed')
        console.log(e);

        await session.abortTransaction();
    }finally{
        console.log('closing transaction')
        session.endSession();
    }
    }

    //Delete
    async deletemany(){
        const model1 =  (await this.modelProvider()).database;
        const session =  (await this.modelProvider()).session;

        session.startTransaction();
        try{
        
            await model1.deleteMany({
                "name":"delete"
            }).session(session)
                        
            await model1.deleteOne({
                "lastnam":"delete"
            }).session(session)

            await session.commitTransaction();
    }catch(e){
        console.log('Failed')
        console.log(e);
        await session.abortTransaction();
    }finally{
        console.log('closing transaction')
        session.endSession();
    }
    }

}

//mongodb://localhost:27017/MasterDB/