// this file was generated with command: nest g class events/entities/event.entity --no-spec
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Event extends mongoose.Document {  // Note "entity" was removed from the class "name"
  @Prop()
  type: string;

  @Prop({index:true})
  name: string;

  @Prop(mongoose.SchemaTypes.Mixed)
  payload: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);
// 1: sort by ascending order, -1: sort by descending order
EventSchema.index({ name: 1, type: -1 })
