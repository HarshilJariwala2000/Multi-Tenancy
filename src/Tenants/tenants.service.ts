import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Tenant, TenantDocument } from "src/schemas/tenants.schema";
import { Model } from 'mongoose';

@Injectable()
export class TenantService{
    constructor(@InjectModel(Tenant.name) private tenantModel: Model<TenantDocument>) {}
    
    async findByName(name: string|string[]): Promise<TenantDocument> {
        return await this.tenantModel.findOne({ databasename:name });
    }
}