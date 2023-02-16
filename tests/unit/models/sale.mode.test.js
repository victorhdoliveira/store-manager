const { expect } = require('chai');
const sinon = require('sinon');
const { saleProductModel, saleModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { sucessSale } = require('./mocks/sale.mode.mock');

describe('Testes de unidade do model de sale', function () {
  it('Verifica se a criação da sale foi executada com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const result = await saleModel.insertNewSale();
    expect(result).to.be.deep.equal(sucessSale.id);
  });

  afterEach(function () {
    sinon.restore();
  });
});