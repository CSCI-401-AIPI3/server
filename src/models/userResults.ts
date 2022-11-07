import { Sequelize, Model } from 'sequelize';
import { Category } from '../../utils/enum';

export interface IUserResult {
  userID: number;
  category: Category;
  score: number;
  timestamp: number;
}

const UserResultFunction = function (
  sequelize: Sequelize,
  DataTypes: any
): any {
  class UserResult extends Model implements IUserResult {
    declare userID: number;

    declare category: Category;

    declare score: number;

    declare timestamp: number;
  }
  UserResult.init(
    {
      userResultID: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      userID: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      category: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      score: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
    },
    {
      sequelize,
      modelName: 'UserResult',
      timestamps: true,
    }
  );
  return UserResult;
};

export { UserResultFunction };
