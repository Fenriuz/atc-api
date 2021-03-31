import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Complement } from '@ts/interfaces/complement';
import { Schema as mongooseSchema, Document } from 'mongoose';

export type MealDocument = Meal & Document;

@Schema()
export class Meal {
  _id?: string;

  @Prop()
  displayName?: string;

  @Prop()
  description?: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Restaurant' })
  restaurant?: string;

  @Prop({ type: mongooseSchema.Types.Decimal128 })
  price?: string;

  @Prop()
  complements?: Complement[];

  @Prop({ default: false })
  disabled?: boolean;
}

export const MealSchema = SchemaFactory.createForClass(Meal);
