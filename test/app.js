const request = require('supertest');
const chai = require('chai');

const app = require('../lib').express;
const should = chai.should();

describe('GET /', () => {
    it('should return 302 redirect', (done) => {
        request(app)
            .get('/')
            .expect(302, (err, res) => {
                should.not.exist(err);
                done();
            });
     });
});

describe('POST /signup', () => {
    it('should register successfulyy', (done) => {
        request(app)
            .post('/signup')
            .send({
                username: 'test',
                email: 'test@test.com',
                password: '111111'
            })
            .expect(302, (err, res) => {
                should.not.exist(err);
                done();
            })
    });
});

describe('POST /login', () => {
    it('should log in success', (done) => {
        request(app)
            .post('/login')
            .send({
                email: 'test@test.com',
                password: '111111'
            })
            .expect(302, done);
    });
});