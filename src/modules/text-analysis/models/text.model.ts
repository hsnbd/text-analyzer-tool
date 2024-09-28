import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../auth/models/user.model';

@Table({ tableName: 'texts' })
export class TextModel extends Model<TextModel> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  })
  id: number;

  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    onDelete: 'RESTRICT',
  })
  @ForeignKey(() => User)
  user_id: number;

  @Column({
    type: DataTypes.TEXT,
    allowNull: false,
    validate: { notNull: true, len: [1, 10000] },
  })
  text_body: string;

  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
  })
  number_of_words: number;

  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
  })
  number_of_characters: number;

  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
  })
  number_of_sentences: number;

  @Column({
    type: DataTypes.INTEGER.UNSIGNED,
  })
  number_of_paragraphs: number;

  @Column({
    type: DataTypes.TEXT,
  })
  longest_words_in_paragraphs: string;

  @BelongsTo(() => User)
  user: User;
}
