import { Sequelize, Model } from 'sequelize';

export interface IUserAnswer {
    userAnswerID: number;
    userID: number;
    answerList: string[];
}

const UserAnswerFunction = function (sequelize: Sequelize, DataTypes: any): any {
  class UserAnswer extends Model implements IUserAnswer {
    declare userAnswerID: number;

    declare userID: number;

    declare answerList: string[];
  }
  UserAnswer.init(
    {
      userAnswerID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userID: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      answerList: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: 'UserAnswer',
      timestamps: true,
    },
  );
  return UserAnswer;
};

export { UserAnswerFunction };
