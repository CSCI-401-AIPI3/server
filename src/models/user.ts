import { Sequelize, Model } from 'sequelize';
import { TechMaturity } from '../../utils/enum';
import bcrypt from 'bcrypt-nodejs';
export interface IUser {
  userID: number;
  name?: string;
  company?: string;
  email: string;
  password: string;
  technicalMaturity?: TechMaturity;
  pointOfContact?: string;
  requestsHelp?: boolean;
  role?: string;
  validPassword: any;
  generateHash: any;
}

const UserFunction = function (sequelize: Sequelize, DataTypes: any): any {
  class User extends Model implements IUser {
    declare userID: number;

    declare email: string;

    declare password: string;

    validPassword(password: string) {
      return bcrypt.compareSync(password, this.password);
    }

    generateHash(password: string) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    }
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
        type: DataTypes.STRING,
      },
      company: {
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      technicalMaturity: {
        type: DataTypes.STRING,
      },
      pointOfContact: {
        type: DataTypes.STRING,
      },
      requestsHelp: {
        type: DataTypes.BOOLEAN,
      },
      role: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
    }
  );
  return User;
};

export { UserFunction };
