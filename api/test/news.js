/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable max-len */
import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../';

const newsRoute = '/public/v1/News';

chai.use(chaiHttp);
chai.should();
describe('news get post', async () => {
	it('news post', (done) => {
		chai
			.request(api)
			.post(newsRoute)
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({
				title: 'Flutter 2.0 Duyuruldu',
				news_text: `Bugün, Flutter’ın yeni versiyonu olan Flutter 2 tanıtıldı.
          Flutter 2 sürümüyle birlikte artık sadece mobil 
          framework olmaktan çıkıyor.`
			})
			.end((err, res) => {
				if (err) {
					done(err);
				}
				res.should.have.status(200);
				res.should.be.a('object');
				res.body.should.have.keys('status', 'message');
				res.body.should.have.property('status').equal(true);
				done();
			});
	});

	it('news get', (done) => {
		chai
			.request(api)
			.get(newsRoute)
			.set('content-type', 'application/x-www-form-urlencoded')
			.end((err, res) => {
				if (err) {
					done(err);
				}
				res.should.have.status(200);
				res.should.be.a('object');
				res.body.should.have.keys('status', 'message', 'data');
				done();
			});
	});
});
