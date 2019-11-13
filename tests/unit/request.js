var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);

it('Successfully receives data', function(done) {
chai.request('http://localhost:3000')
  .put('/stickers')
  .end(function (err, res) {
    expect(err).to.be.null;
    expect(res).to.have.status(200);
    done();
  });
});
