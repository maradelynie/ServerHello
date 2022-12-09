module.exports = (app) => {
  const Users = app.models.users;
  const Tournaments = app.models.tournaments;
  const Racers = app.models.racers;
  const Races = app.models.races;
  const Keys = app.models.keys;

  Users.hasMany(Tournaments);
  Tournaments.belongsTo(Users, { foreignKey: 'UserId' });


  Tournaments.hasMany(Racers);
  Racers.belongsTo(Tournaments, { foreignKey: 'TournamentId' });

  Tournaments.hasMany(Keys);
  Keys.belongsTo(Tournaments, { foreignKey: 'KeyId' });

  Keys.hasMany(Races, { foreignKey: 'KeysId' });

  Racers.hasMany(Races, { foreignKey: 'PlayerAId' });
  Racers.hasMany(Races, { foreignKey: 'PlayerBId' });
  Racers.hasMany(Races, { foreignKey: 'WinnerId' });
};
