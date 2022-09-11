import { Sequelize, Model } from 'sequelize';

export interface IUser {
    userID: number;
    userUUID: string;
}

const UserFunction = function (sequelize: Sequelize, DataTypes: any): any {
  class User extends Model implements IUser {
    declare userID: number;

    declare userUUID: string;
  }
  User.init(
    {
      userID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userUUID: {
        unique: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
