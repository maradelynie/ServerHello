const jwt = require('jwt-simple');
describe('Routes:	Tournaments', () => {
  const Users = app.models.users;
  const Tournaments = app.models.tournaments;
  let token;
  let fakeTask;
  beforeEach(async () => {
    await Users.destroy({ where: {} });
    const user = await Users.create({
      name: 'John',
      email: 'john@mail.net',
      password: '12345'
    });
    await Tournaments.destroy({ where: {} });
    const tournaments = await Tournaments.bulkCreate([
      { id: 1, title: 'Work', UserId: user.id },
      { id: 2, title: 'Study', UserId: user.id }
    ]);
    fakeTask = tournaments[0];
    token = jwt.encode({ id: user.id }, config.jwt.secret);
  });
  describe('GET	/tournaments', () => {
    describe('status	200', () => {
      it('returns	a	list	of	tournaments', done => {
        request.get('/tournaments')
          .set('Authorization', token)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(2);
            expect(res.body[0].title).to.eql('Work');
            expect(res.body[1].title).to.eql('Study');
            done(err);
          });
      });
    });
  });

  describe('POST	/tournaments', () => {
    describe('status	200', () => {
      it('creates	a	new	task', done => {
        request.post('/tournaments')
          .set('Authorization', token)
          .send({ title: 'Run' })
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql('Run');
            expect(res.body.done).to.be.false;
            done(err);
          });
      });
    });
  });

  describe('GET	/tournaments/:id', () => {
    describe('status	200', () => {
      it('returns	one	task', done => {
        request.get(`/tournaments/${fakeTask.id}`)
          .set('Authorization', token)
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql('Work');
            done(err);
          });
      });
    });
    describe('status	404', () => {
      it('throws	error	when	task	not	exist', done => {
        request.get('/tournaments/0')
          .set('Authorization', token)
          .expect(404)
          .end(done);
      });
    });
  });
  describe('PUT	/tournaments/:id', () => {
    describe('status	204', () => {
      it('updates	a	task', done => {
        request.put(`/tournaments/${fakeTask.id}`)
          .set('Authorization', token)
          .send({ title: 'Travel', done: true })
          .expect(204)
          .end(done);
      });
    });
  });
  describe('DELETE	/tournaments/:id', () => {
    describe('status	204', () => {
      it('removes	a	task', done => {
        request.delete(`/tournaments/${fakeTask.id}`)
          .set('Authorization', token)
          .expect(204)
          .end(done);
      });
    });
  });

});
