module.exports = app => {
  const Keys = app.models.keys;
  const Racers = app.models.racers;
  const Races = app.models.races;
  const Tournaments = app.models.tournaments;

  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const createMatches = racers => {
    const keysCount = shuffleArray(racers).reduce((add, racer, index) => {
      if (index % 2 === 0) {
        const nextRacer = racers[index + 1]?.dataValues
        if (!nextRacer) return [...add, [racer.dataValues]]
        return [...add, [racer.dataValues, nextRacer]]
      }
      return add
    }, [])
    return keysCount
  }


  app.route('/keys')
    .all(app.auth.authenticate())
    .post(async (req, res) => {
      try {
        req.body.UserId = req.user.id;
        const where = { id: req.body.TournamentId, UserId: req.user.id };
        const tournament = await Tournaments.findOne({ where });
        if (tournament) {
          const racers = await Racers.findAll({ where: { TournamentId: req.body.TournamentId } });

          const keys = await Keys.create(req.body);

          const pairs = createMatches(racers)
          const races = await Promise.all(pairs.map(async race => {
            const match = await Races.create({
              KeysId: keys.id,
              category: req.body.category,
              wo: race.length === 1,
              PlayerAId: race[0].id,
              PlayerBId: race.length > 1 ? race[1].id : null,
              WinnerId: null
            })
            return match
          }))

          console.log({ ...keys, races })
          res.json({ ...keys, races });
        }
        else res.sendStatus(401);

      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    });
  app.route('/keys/:id')
    .all(app.auth.authenticate())
    .put(async (req, res) => {
      try {
        const { id } = req.params;
        const where = { id: req.body.TournamentId, UserId: req.user.id };
        const tournament = await Tournaments.findOne({ where });
        if (!tournament) res.sendStatus(404);
        await Keys.update(req.body, { where: { id } });
        res.sendStatus(204);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    })
    .delete(async (req, res) => {
      try {
        const { id } = req.params;
        const where = { id: req.body.TournamentId, UserId: req.user.id };
        const tournament = await Tournaments.findOne({ where });
        if (!tournament) res.sendStatus(404);
        await Keys.destroy({ where: { id } });
        res.sendStatus(204);

      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    });


};
