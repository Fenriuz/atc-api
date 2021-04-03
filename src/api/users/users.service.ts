import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UsersDao } from './users.dao';
import { genSalt, hash } from 'bcrypt';
import { CloudinaryService } from '@services/cloudinary/cloudinary.service';
import { cloudinaryFolders } from '@shared/constants/cloudinary.constants';
import { httpErrors } from '@shared/constants/http-errors.constants';

@Injectable()
export class UsersService {
  constructor(private usersDao: UsersDao, private cloudinaryService: CloudinaryService) {}

  async encryptPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    const encryptedPassword = await hash(password, salt);

    return encryptedPassword;
  }

  getUserPhoto(id: string) {
    const URL = cloudinaryFolders.url;

    const image = `${URL}/${cloudinaryFolders.users}/${id}`;

    return image;
  }

  async findAll() {
    const records = await this.usersDao.findAll();
    const users = records.map((user) => {
      const image = this.getUserPhoto(user?._id);

      return { image, ...user?.toJSON() };
    });

    return users;
  }

  async findById(id: string) {
    const record = await this.usersDao.findById(id);
    if (!record) {
      throw new HttpException(httpErrors.findOneUser, HttpStatus.NOT_FOUND);
    }
    const image = this.getUserPhoto(record?._id);

    return { image, ...record?.toJSON() };
  }

  async create({ password, photo, ...user }: CreateUserDto) {
    const encryptedPassword = await this.encryptPassword(password);
    const record = await this.usersDao.create({ password: encryptedPassword, ...user });

    this.cloudinaryService.upload(photo, 'user', record?._id);

    const image = this.getUserPhoto(record?._id);

    return { image, ...user };
  }

  async update(id: string, { password, photo, ...user }: UpdateUserDto) {
    let encryptedPassword: string;
    if (password) {
      encryptedPassword = await this.encryptPassword(password);
    }

    const record = await this.usersDao.update(id, { password: encryptedPassword, ...user });
    if (photo) {
      this.cloudinaryService.upload(photo, 'user', record?._id);
    }

    const image = this.getUserPhoto(record?._id);

    return { image, ...user };
  }
}
