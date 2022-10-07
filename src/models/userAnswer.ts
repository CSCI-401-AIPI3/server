import { Sequelize, Model } from 'sequelize';

export interface IUserAnswer {
  questionID: number;
  userID: number;
  answerList: string[];
}

const UserAnswerFunction = function (
  sequelize: Sequelize,
  DataTypes: any
): any {
  class UserAnswer extends Model implements IUserAnswer {
    declare questionID: number;

    declare userID: number;

    declare answerList: string[];
  }
  // note: specifying true for 2+ cols being primary key creates a composite key
  UserAnswer.init(
    {
      questionID: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userID: {
        allowNull: false,
        primaryKey: true,
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
    }
  );
  return UserAnswer;
};

export { UserAnswerFunction };
