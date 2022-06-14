import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument2 = Client2 & Document;

@Schema({
  toJSON: {
    versionKey: false,
  },
})
export class Client2 {

  @Prop()
  identity: number;

}

export const ClientSchema2 = SchemaFactory.createForClass(Client2);