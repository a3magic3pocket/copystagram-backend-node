import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { USER_COLLECTION_NAME, User, USER_FIELDS } from "./schema/user.schema";
import { Model } from "mongoose";
import { ICreateUserDto } from "./interface/create-dto.interface";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(USER_COLLECTION_NAME) private userModel: Model<User>
  ) {}

  async create(newUser: ICreateUserDto): Promise<User> {
    const createdUser = new this.userModel(newUser);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User> {
    const condition = {};
    condition[USER_FIELDS.email] = email;

    return this.userModel.findOne(condition);
  }

  async findByName(name: string): Promise<User> {
    const condition = {};
    condition[USER_FIELDS.name] = name;

    return this.userModel.findOne(condition);
  }
}
