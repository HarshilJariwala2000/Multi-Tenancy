import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument1 = Client1 & Document;

@Schema({
  toJSON: {
    versionKey: false,
  },
})
export class Client1 {

  @Prop()
  name: string;

}

export const ClientSchema1 = SchemaFactory.createForClass(Client1);