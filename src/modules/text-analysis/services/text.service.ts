import { Injectable } from '@nestjs/common';
import { UpdateTextDto } from '../dto/update-text.dto';
import { CreateTextDto } from '../dto/create-text.dto';
import { TextModel } from '../models/text.model';
import { InjectModel } from '@nestjs/sequelize';
import { IAuthUser } from '../../../core/interfaces/auth-user';

@Injectable()
export class TextService {
  @InjectModel(TextModel)
  private readonly textModel: typeof TextModel;

  async create(
    createTextDto: CreateTextDto,
    authUser: IAuthUser,
  ): Promise<TextModel> {
    return this.textModel.create({ user_id: authUser.id, ...createTextDto });
  }

  async findAll(authUser: IAuthUser): Promise<Array<TextModel>> {
    return this.textModel.findAll({ where: { user_id: authUser.id } });
  }

  async findOne(id: number, authUser: IAuthUser): Promise<TextModel> {
    return this.textModel.findOne({
      where: { id, user_id: authUser.id },
      rejectOnEmpty: true,
    });
  }

  async update(
    id: number,
    updateTextDto: UpdateTextDto,
    authUser: IAuthUser,
  ): Promise<TextModel> {
    const model = await this.textModel.findOne({
      where: { id, user_id: authUser.id },
      rejectOnEmpty: true,
    });

    await model.update(updateTextDto);
    return model;
  }

  async remove(id: number, authUser: IAuthUser): Promise<boolean> {
    const model = await this.textModel.findOne({
      where: { id, user_id: authUser.id },
      rejectOnEmpty: true,
    });
    await model.destroy();
    return true;
  }
}
