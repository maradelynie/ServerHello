const { DataTypes } = require('sequelize');
module.exports = (app) => {
  const Keys = app.db.define('Keys', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    round: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [['sem', 'fem', 'mas']]
      }
    },
    finished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Keys;
};
