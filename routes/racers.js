module.exports = app => {
  const Racers = app.models.racers;
  const Tournaments = app.models.tournaments;
  app.route('/racers')
    .all(app.auth.authenticate())
    .post(async (req, res) => {
      try {

        req.body.UserId = req.user.id;
        const where = { id: req.body.TournamentId, UserId: req.user.id };
        const tournament = await Tournaments.findOne({ where });
        if (tournament) {
          const result = await Racers.create(req.body);
          res.json(result);
        }
        else res.sendStatus(401);

      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    });
  app.route('/racers/:id')
    .all(app.auth.authenticate())
    .put(async (req, res) => {
      try {
        const { id } = req.params;
        const where = { id: req.body.TournamentId, UserId: req.user.id };
        const tournament = await Tournaments.findOne({ where });
        if (!tournament) res.sendStatus(404);
        await Racers.update(req.body, { where: { id } });
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
        await Racers.destroy({ where: { id } });
        res.sendStatus(204);

      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    });


};
