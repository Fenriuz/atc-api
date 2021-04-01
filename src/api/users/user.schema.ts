import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id?: string;

  @Prop()
  readonly displayName?: string;

  @Prop({ unique: true, index: true })
  readonly phone?: string;

  @Prop({ unique: true, index: true })
  readonly email?: string;

  @Prop({ select: false })
  readonly password?: string;

  @Prop({ default: false })
  readonly disabled?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
