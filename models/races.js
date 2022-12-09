const { DataTypes } = require('sequelize');
module.exports = (app) => {
  const Races = app.db.define('Races', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [['sem', 'fem', 'mas']]
      }
    },
    wo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Races;
};
