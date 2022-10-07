import { Sequelize, Model } from 'sequelize';
import { Category } from '../../utils/enum';

export interface IIndustryAverage {
  industryAverageID: number;
  category: Category;
  score: number;
  entries: number;
}

const IndustryAverageFunction = function (
  sequelize: Sequelize,
  DataTypes: any
): any {
  class IndustryAverage extends Model implements IIndustryAverage {
    declare industryAverageID: number;
    declare category: Category;
    declare score: number;
    declare entries: number;
  }
  IndustryAverage.init(
    {
      industryAverageID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      entries: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'UserResult',
      timestamps: true,
    }
  );
  return IndustryAverage;
};

export { IndustryAverageFunction };
