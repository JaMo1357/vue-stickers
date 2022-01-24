var chai = require('chai')
  , chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);


describe('From local server', function() {
  it('Successfully retreives data', (done) => {
  chai.request('http://localhost:3000')
    .put('/stickers')
    .set('content-type', 'application/json')
    .end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
    });
  });
});
