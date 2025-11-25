const chai = require('chai');
const request = require('supertest');
const nock = require('nock');

const app = require('../src/app');

const { expect } = chai;

describe('GET /files/data', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  after(() => {
    nock.cleanAll();
  });

  it('debe devolver datos con el formato correcto', async () => {
    nock('https://echo-serv.tbxnet.com')
      .get('/v1/secret/files')
      .reply(200, {
        files: ['file1.csv'],
      });

    const csvContent = `file,text,number,hex
file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765
file1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5
file1.csv,BAD_ROW,ONLY_TEXT
file1.csv,PNzRfORtKtEDOzmIVrQuSh,74088708,3e29651a63a5202a5661e05a060401fb`;

    nock('https://echo-serv.tbxnet.com')
      .get('/v1/secret/file/file1.csv')
      .reply(200, csvContent);

    const res = await request(app)
      .get('/files/data')
      .set('accept', 'application/json')
      .expect(200);

    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);

    const fileEntry = res.body[0];
    expect(fileEntry).to.have.property('file', 'file1.csv');
    expect(fileEntry).to.have.property('lines');
    expect(fileEntry.lines).to.be.an('array');

    expect(fileEntry.lines.length).to.equal(3);

    const firstLine = fileEntry.lines[0];
    expect(firstLine).to.deep.include({
      text: 'RgTya',
      number: 64075909,
      hex: '70ad29aacf0b690b0467fe2b2767f765',
    });
  });

  it('debe filtrar por fileName usando query param', async () => {
    nock('https://echo-serv.tbxnet.com')
      .get('/v1/secret/files')
      .reply(200, {
        files: ['file1.csv', 'file2.csv'],
      });

    nock('https://echo-serv.tbxnet.com')
      .get('/v1/secret/file/file2.csv')
      .reply(
        200,
        `file,text,number,hex
file2.csv,OnlyThis,123,0123456789abcdef0123456789abcdef`
      );

    const res = await request(app)
      .get('/files/data')
      .query({ fileName: 'file2.csv' })
      .expect(200);

    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
    expect(res.body[0].file).to.equal('file2.csv');
    expect(res.body[0].lines.length).to.equal(1);
    expect(res.body[0].lines[0].text).to.equal('OnlyThis');
  });

  it('debe manejar error del API externo (listado) con 500', async () => {
    nock('https://echo-serv.tbxnet.com')
      .get('/v1/secret/files')
      .reply(500, { message: 'Upstream error' });

    const res = await request(app).get('/files/data').expect(500);

    expect(res.body).to.have.property('message');
  });
});
