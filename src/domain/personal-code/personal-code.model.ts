import { Column, Table, Model, DataType } from 'sequelize-typescript';
import { Gender } from './enum/gender.enum';

@Table
export class PersonalCodeModel extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  personalCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  countryCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  gender: Gender;
}
