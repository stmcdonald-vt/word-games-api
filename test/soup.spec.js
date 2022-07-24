const chai = require('chai');
const assert = require('chai').assert;
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('AlphabetSoup', () => {
    // get /
    it('Soup get route', async () => {
        const response = await chai.request(server).get('/game/soup');
        assert.equal(response.text, "Main Soup Route");
    });
    // get /levels
    it('Get an array of levels IDs', async () => {
        const response = await chai.request(server).get('/game/soup/levels');
        assert.isArray(response.body);
        response.body.forEach(ele => assert.isNumber(ele));
    })
    // get /levels/:id
    it('Level information, valid ID', async () => {
        const response = await chai.request(server).get('/game/soup/level/0');
        assert.isObject(response.body);
        assert.property(response.body, "letters");
        assert.property(response.body, "lengths");
    })
    it('Level information, non-numerical ID', async () => {
        const response = await chai.request(server).get('/game/soup/level/abcdefg');
        assert.equal(response.status, 400);
    })
    it('Level information, negative ID', async () => {
        const response = await chai.request(server).get('/game/soup/level/-1');
        assert.equal(response.status, 400);
    })
    it('Level information, ID too large', async () => {
        const response = await chai.request(server).get('/game/soup/level/1000');
        assert.equal(response.status, 400);
    })
    // post /validate
    it('Validate Answer, Correct, All Caps', async () => {
        const response = await chai
            .request(server)
            .post('/game/soup/validate')
            .send({
                level: 0,
                guess: "FUSED"
            });
        console.log(response);
        assert.isTrue(response.body);
    })

});
