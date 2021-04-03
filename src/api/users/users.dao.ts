import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { databaseErrors } from '@shared/constants/database-errors.constants';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersDao {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll() {
    try {
      return await this.userModel.find();
    } catch (dbErr) {
      throw new HttpException(httpErrors.findAllUsers, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: string) {
    try {
      return await this.userModel.findById(id);
    } catch (dbErr) {
      throw new HttpException(httpErrors.findOneUser, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(email?: string, phone?: string) {
    try {
      return await this.userModel
        .findOne({
          $or: [{ email }, { phone }],
        })
        .select(['+password']);
    } catch (dbErr) {
      throw new HttpException(httpErrors.findOneUser, HttpStatus.NOT_FOUND);
    }
  }

  async create(user: User) {
    try {
      return await this.userModel.create(user);
    } catch (dbErr) {
      throw new HttpException(
        databaseErrors(dbErr, httpErrors.createUser),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, user: User) {
    try {
      return await this.userModel.findByIdAndUpdate(id, user, { new: true });
    } catch (dbErr) {
      throw new HttpException(
        databaseErrors(dbErr, httpErrors.updateUser),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
