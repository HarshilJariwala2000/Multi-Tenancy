import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TenantDocument = Tenant & Document;

@Schema()
export class Tenant {

  @Prop()
  host: string;

  @Prop()
  port: number;

  @Prop()
  databasename: string;

  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);