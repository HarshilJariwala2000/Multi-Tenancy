import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TenantDocument = Tenant & Document;

@Schema()
export class Tenant {
  @Prop()
  alias: string;

  @Prop()
  host: string;

  @Prop()
  port: number;

  @Prop()
  database: number;

  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);