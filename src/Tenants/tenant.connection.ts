import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import {Connection,Model, Schema} from "mongoose";
import mongoose from "mongoose";
import { TenantService } from "./tenants.service";
import { TenantDocument } from "src/schemas/tenants.schema";
import { REQUEST } from "@nestjs/core";
import { Request } from 'express';
let URI_MODEL = require('../config/uri.configuration');
let Admin = mongoose.mongo.Admin;

@Injectable({ scope: Scope.REQUEST })
export class TenantConnection {
    private _tenantId: string | string[];
    private _collectionList:Object[]

    constructor(
        private tenantService: TenantService,
        @Inject(REQUEST) private request: Request,
    ) {}
    
    private async getConnection(): Promise<Connection> {
        //Get TenantID from Header
        this._tenantId = this.request.headers['tenantid'];

        // Get the tenant details from the database
        const tenant = await this.tenantService.findByName(this._tenantId);

        // Validation check if tenant exist
        if (!tenant) {
            throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND);
        }

        //Get the underlying mongoose connections
        const connections: Connection[] = mongoose.connections;

        // Find existing connection
        const foundConn = connections.find((con: Connection) => {
            return con.name === `${tenant.databasename}`;
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
        let URI_FETCH = new URI_MODEL(tenant.host, tenant.port, tenant.databasename, tenant.username, tenant.password);
        const uri = URI_FETCH.MONGO_URI()  
        const db = mongoose.createConnection(uri);
        console.log('created connection');
        return db;

    }

    private async modelProvider(collectionName:string){
        const db = await this.getConnection();
        const session = await db.startSession();

        //Get list of collections
        let collectionList = await db.getClient().db(db.name).listCollections().toArray();

        //Check if Collection Exist or not
        const collectionExist = collectionList.find((collection)=>{
            return collection.name===collectionName;
        })
        if (!collectionExist) {
            throw new HttpException('Collection not found', HttpStatus.NOT_FOUND);
        }

        return {
            "connection":db,
            "model": db.models[collectionName] || db.model(collectionName, new Schema({ any: Schema.Types.Mixed },{strict:false,versionKey: false})),
            "session":session
        }
    }

    //findById
    async findById(collectionName: string, id:string){
        const modelAndSession = await this.modelProvider(collectionName);
        const model = modelAndSession.model;
        return model.findById(id)
    }

    //Find All
    async findAll(collectionName:string) {
        const modelAndSession = await this.modelProvider(collectionName);
        const model = modelAndSession.model;
        return model.find({});        
    }

    //Update
    async update(collectionName:string, findQuery:any, updateQuery:any){
        const modelAndSession = await this.modelProvider(collectionName);
        const model = modelAndSession.model;
        await model.updateOne(findQuery, updateQuery)
        
    }

    //InsertOne
    async insert(collectionName:string, data:any){
        const modelAndSession = await this.modelProvider(collectionName);
        const db = modelAndSession.connection;
        db.getClient().db(db.name).collection(collectionName).insertOne(data);
        
    }

    //InsertMany
    async insertMany(collectionName:string, body:any){
        const modelAndSession = await this.modelProvider(collectionName);
        const model = modelAndSession.model;
        const session = modelAndSession.session;
        session.startTransaction();
        try{
            await model.insertMany(body,{"session":session})
            await session.commitTransaction();
        }catch(e){
            console.log(e);
            await session.abortTransaction();
        }finally{
            console.log('closing transaction')
            session.endSession();
        }
    }

    //Update
    async updateMany(collectionName:string, findQuery:any, updateQuery:any){
        const modelAndSession = await this.modelProvider(collectionName);
        const model = modelAndSession.model;
        const session = modelAndSession.session;
        session.startTransaction();
        try{
            await model.updateMany(findQuery,updateQuery).session(session)
            await session.commitTransaction();
        }catch(e){
            console.log(e);
            await session.abortTransaction();
        }finally{
            console.log('closing transaction')
            session.endSession();
        }
    }

    //Delete
    async delete(collectionName:string, deleteQuery:any){
        const modelAndSession = await this.modelProvider(collectionName);
        const model = modelAndSession.model;
        await model.deleteOne(deleteQuery)
    }

    //DeleteMany
    async deleteMany(collectionName:string, deleteQuery:any){
        const modelAndSession = await this.modelProvider(collectionName);
        const model = modelAndSession.model;
        await model.deleteMany(deleteQuery)
    }

}

