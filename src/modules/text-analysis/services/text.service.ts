import { Injectable } from '@nestjs/common';
import { UpdateTextDto } from '../dto/update-text.dto';
import { CreateTextDto } from '../dto/create-text.dto';
import { TextModel } from '../models/text.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TextService {
  @InjectModel(TextModel)
  private readonly textModel: typeof TextModel;

  async create(createTextDto: CreateTextDto): Promise<TextModel> {
    return this.textModel.create(createTextDto);
  }

  async findAll(): Promise<Array<TextModel>> {
    return this.textModel.findAll({});
  }

  async findOne(id: number): Promise<TextModel> {
    return this.textModel.findByPk(id);
  }

  async update(id: number, updateTextDto: UpdateTextDto): Promise<TextModel> {
    const model = await this.textModel.findByPk(id);
    await model.update(updateTextDto);
    return model;
  }

  async remove(id: number): Promise<boolean> {
    const model = await this.textModel.findByPk(id);
    await model.destroy();
    return true;
  }
}
