const { DataTypes } = require('sequelize');
module.exports = (app) => {
  const Racers = app.db.define('Racers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    average_speed: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0
    },
    wos: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    times_played: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    victories: {
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
    dead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  });
  return Racers;
};
