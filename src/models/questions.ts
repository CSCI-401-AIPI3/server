import { Sequelize, Model } from 'sequelize';
import { Category, AnswerType } from '../../utils/enum';

export interface IQuestion {
  questionID: number;
    category: Category;
    questionString: string;
    answerType: AnswerType;
    answerOptionsList: string[];
    weight: number;
}

const QuestionFunction = function (sequelize: Sequelize, DataTypes: any): any {
  class Question extends Model implements IQuestion {
    questionID: number;

    category: Category;

    questionString: string;

    answerType: AnswerType;

    answerOptionsList: string[];

    weight: number;
  }
  Question.init(
    {
      userID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      category: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      questionString: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      answerType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      answerOptionsList: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      weight: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
    },
    {
      sequelize,
      modelName: 'Question',
      timestamps: true,
    },
  );
  return Question;
};

export { QuestionFunction };
