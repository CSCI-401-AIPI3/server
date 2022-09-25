import { Sequelize, Model } from 'sequelize';
import { TechMaturity } from '../../utils/enum';

export interface IUser {
    userID: number;
    name: string;
    company: string;
    email: string;
    technicalMaturity: TechMaturity;
    pointOfContact: string;

}

const UserFunction = function (sequelize: Sequelize, DataTypes: any): any {
  class User extends Model implements IUser {
    declare userID: number;

    declare name: string;

    declare company: string;

    declare email: string;

    declare technicalMaturity: TechMaturity;

    declare pointOfContact: string;
  }
  User.init(
    {
      userID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      company: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      technicalMaturity: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      pointOfContact: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
    },
  );
  return User;
};

export { UserFunction };
