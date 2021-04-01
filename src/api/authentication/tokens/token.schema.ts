import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { User } from 'src/api/users/user.schema';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  _id?: string;

  @Prop({ required: true, type: mongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
