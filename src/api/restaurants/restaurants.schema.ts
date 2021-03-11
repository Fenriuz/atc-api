import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RestaurantDocument = Restaurant & Document;

export class Schedule {
  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
  sunday: Day;
}

export class Day {
  open: boolean;
  hours: number[];
}

@Schema()
export class Restaurant {
  @Prop()
  id?: string;

  @Prop()
  displayName: string;

  @Prop()
  description?: string;

  //   @Prop()
  //   images?: Images;

  @Prop()
  schedule: Schedule;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  locations: any;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
