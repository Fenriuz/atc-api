import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
      console.log(dbErr);
      throw new HttpException(httpErrors.findOneUser, HttpStatus.NOT_FOUND);
    }
  }

  async create(user: User) {
    try {
      return await this.userModel.create(user);
    } catch (dbErr) {
      if (dbErr?.code === 11000) {
        throw new HttpException('ATC error: duplicated email', HttpStatus.CONFLICT);
      }

      throw new HttpException(httpErrors.createUser, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, user: User) {
    try {
      return await this.userModel.findByIdAndUpdate(id, user, { new: true });
    } catch (dbErr) {
      if (dbErr?.code === 11000) {
        throw new HttpException('ATC error: duplicated email', HttpStatus.CONFLICT);
      }

      throw new HttpException(httpErrors.updateUser, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
