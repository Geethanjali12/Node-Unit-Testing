const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Notes Controller', () => {
    let noteId;

    // GET
    describe('GET /', () => {
        it('should return all notes', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    // POST
    describe('POST /post', () => {
        it('should create a new note', (done) => {
            chai.request(app)
                .post('/post')
                .send({ title: 'Test Note', content: 'This is a test note.' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    noteId = res.body._id;
                    done();
                });
        });

        it('should handle invalid note data', (done) => {
            chai.request(app)
                .post('/post')
                .send({ invalidField: 'Invalid Data' })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    done();
                });
        });
    });

    // PUT 
    describe('PUT /:id', () => {
        it('should update an existing note', (done) => {
            chai.request(app)
                .put(`/${noteId}`)
                .send({ title: 'Updated Test Note', content: 'This is an updated test note.' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id').equal(noteId);
                    expect(res.body).to.have.property('title').equal('Updated Test Note');
                    done();
                });
        });

        it('should handle updating a non-existing note', (done) => {
            chai.request(app)
                .put('/nonexistentId')
                .send({ title: 'Updated Note' })
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });

    // DELETE 
    describe('DELETE /:id', () => {
        it('should delete an existing note', (done) => {
            chai.request(app)
                .delete(`/${noteId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id').equal(noteId);
                    done();
                });
        });

        it('should handle deleting a non-existing note', (done) => {
            chai.request(app)
                .delete('/nonexistentId')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });
});
