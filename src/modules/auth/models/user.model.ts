import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  })
  id: number;

  @Column({
    type: DataTypes.CHAR(40),
    allowNull: false,
    unique: true,
    validate: { notNull: true, len: [36, 36] },
  })
  sso_id: string;

  @Column({ type: DataTypes.STRING(150), validate: { len: [0, 150] } })
  full_name: string;

  @Column({
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: { notNull: true, isEmail: true, len: [0, 150] },
  })
  email: string;
}
