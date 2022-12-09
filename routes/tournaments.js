module.exports = app => {
  const Tournaments = app.models.tournaments;
  const Racers = app.models.racers;
  app.route('/tournaments')
    .all(app.auth.authenticate())
    /**
          *	@api	{get}	/tournaments	Lista	tarefas
          *	@apiGroup	Tarefas
          *	@apiHeader	{String}	Authorization	Token	de	usuário
          *	@apiHeaderExample	{json}	Header
          *				{"Authorization":	"JWT	xyz.abc.123.hgf"}
          *	@apiSuccess	{Object[]}	tournaments	Lista	de	tarefas
          *	@apiSuccess	{Number}	tournaments.id	Id	de	registro
          *	@apiSuccess	{String}	tournaments.title	Título	da	tarefa
          *	@apiSuccess	{Boolean}	tournaments.finished	Tarefa	foi	concluída?
          *	@apiSuccess	{Date}	tournaments.updated_at	Data	de	atualização
          *	@apiSuccess	{Date}	tournaments.created_at	Data	de	cadastro
          *	@apiSuccess	{Number}	tournaments.UserId	Id	do	usuário
          *	@apiSuccessExample	{json}	Sucesso
          *				HTTP/1.1	200	OK
          *				[{
          *						"id":	1,
          *						"title":	"Estudar",
          *						"finished":	false
          *						"updated_at":	"2015-09-24T15:46:51.778Z",
          *						"created_at":	"2015-09-24T15:46:51.778Z",
          *						"UserId":	1
          *				}]
          *	@apiErrorExample	{json}	Erro	de	consulta
          *				HTTP/1.1	412	Precondition	Failed
          */
    .get(async (req, res) => {
      try {
        const where = { UserId: req.user.id };
        const result = await Tournaments.findAll({ where });
        res.json(result);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    })
    /**
        *	@api	{post}	/tournaments	Cadastra	uma	tarefas
        *	@apiGroup	Tarefas
        *	@apiHeader	{String}	Authorization	Token	de	usuário
        *	@apiHeaderExample	{json}	Header
        *				{"Authorization":	"JWT	xyz.abc.123.hgf"}
        *	@apiParam	{String}	title	Título	da	tarefa
        *	@apiParamExample	{json}	Entrada
        *				{"title":	"Estudar"}
        *	@apiSuccess	{Number}	id	Id	de	registro
        *	@apiSuccess	{String}	title	Título	da	tarefa
        *	@apiSuccess	{Boolean}	finished=false	Tarefa	foi	concluída?
        *	@apiSuccess	{Date}	updated_at	Data	de	atualização
        *	@apiSuccess	{Date}	created_at	Data	de	cadastro
        *	@apiSuccess	{Number}	UserId	Id	do	usuário
        *	@apiSuccessExample	{json}	Sucesso
        *				HTTP/1.1	200	OK
        *				{
        *						"id":	1,
        *						"title":	"Estudar",
        *						"finished":	false,
        *						"updated_at":	"2015-09-24T15:46:51.778Z",
        *						"created_at":	"2015-09-24T15:46:51.778Z",
        *						"UserId":	1
        *				}
        *	@apiErrorExample	{json}	Erro	de	consulta
        *				HTTP/1.1	412	Precondition	Failed
        */
    .post(async (req, res) => {
      try {
        req.body.UserId = req.user.id;
        const result = await Tournaments.create(req.body);
        res.json(result);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    });
  /**
    *	@api	{get}	/tournaments/:id	Exibe	uma	tarefa
    *	@apiGroup	Tarefas
    *	@apiHeader	{String}	Authorization	Token	de	usuário
    *	@apiHeaderExample	{json}	Header
    *				{"Authorization":	"JWT	xyz.abc.123.hgf"}
    *	@apiParam	{id}	id	Id	da	tarefa
    *	@apiSuccess	{Number}	id	Id	de	registro
    *	@apiSuccess	{String}	title	Título	da	tarefa
    *	@apiSuccess	{Boolean}	finished	Tarefa	foi	concluída?
    *	@apiSuccess	{Date}	updated_at	Data	de	atualização
    *	@apiSuccess	{Date}	created_at	Data	de	cadastro
    *	@apiSuccess	{Number}	UserId	Id	do	usuário
    *	@apiSuccessExample	{json}	Sucesso
    *				HTTP/1.1	200	OK
    *				{
    *						"id":	1,
    *						"title":	"Estudar",
    *						"finished":	false
    *						"updated_at":	"2015-09-24T15:46:51.778Z",
    *						"created_at":	"2015-09-24T15:46:51.778Z",
    *						"UserId":	1
    *				}
    *	@apiErrorExample	{json}	Tarefa	não	existe
    *				HTTP/1.1	404	Not	Found
    *	@apiErrorExample	{json}	Erro	de	consulta
    *				HTTP/1.1	412	Precondition	Failed
    */

  app.route('/tournaments/:id')
    .all(app.auth.authenticate())
    .get(async (req, res) => {
      try {
        const { id } = req.params;
        const where = { id, UserId: req.user.id };
        const tournament = await Tournaments.findOne({ where });
        if (!tournament) res.sendStatus(404);
        const racers = await Racers.findAll({ where: { TournamentId: id } });
        const result = { ...tournament.dataValues, racers }
        res.json(result);

      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    })
    /**
        *	@api	{put}	/tournaments/:id	Atualiza	uma	tarefa
        *	@apiGroup	Tarefas
        *	@apiHeader	{String}	Authorization	Token	de	usuário
        *	@apiHeaderExample	{json}	Header
        *				{"Authorization":	"JWT	xyz.abc.123.hgf"}
        *	@apiParam	{id}	id	Id	da	tarefa
        *	@apiParam	{String}	title	Título	da	tarefa
        *	@apiParam	{Boolean}	finished	Tarefa	foi	concluída?
        *	@apiParamExample	{json}	Entrada
        *				{
        *						"title":	"Trabalhar",
        *						"finished":	true
        *				}
        *	@apiSuccessExample	{json}	Sucesso
        *				HTTP/1.1	204	No	Content
        *	@apiErrorExample	{json}	Erro	de	consulta
        *				HTTP/1.1	412	Precondition	Failed
        */
    .put(async (req, res) => {
      try {
        const { id } = req.params;
        const where = { id, UserId: req.user.id };
        req.body.UserId = req.user.id;
        await Tournaments.update(req.body, { where });
        res.sendStatus(204);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    })
    /**
          *	@api	{delete}	/tournaments/:id	Exclui	uma	tarefa
          *	@apiGroup	Tarefas
          *	@apiHeader	{String}	Authorization	Token	de	usuário
          *	@apiHeaderExample	{json}	Header
          *				{"Authorization":	"JWT	xyz.abc.123.hgf"}
          *	@apiParam	{id}	id	Id	da	tarefa
          *	@apiSuccessExample	{json}	Sucesso
          *				HTTP/1.1	204	No	Content
          *	@apiErrorExample	{json}	Erro	de	consulta
          *				HTTP/1.1	412	Precondition	Failed
          */

    .delete(async (req, res) => {
      try {
        const { id } = req.params;
        const where = { id, UserId: req.user.id };
        await Tournaments.destroy({ where });
        res.sendStatus(204);
      } catch (err) {
        res.status(412).json({ msg: err.message });
      }
    });
};
