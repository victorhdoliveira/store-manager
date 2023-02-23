const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { sucessSale, allSales, saleId2, removeSale1, updatedSale } = require('./mocks/sale.mode.mock');

describe('Testes de unidade do model de sale', function () {
  it('Verifica se a criação da sale foi executada com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const result = await saleModel.insertNewSale();
    expect(result).to.be.deep.equal(sucessSale.id);
  });

   it('Recuperando a lista de sales', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);
    const result = await saleModel.findAll();
    expect(result).to.be.deep.equal(allSales);
  });

  it('Recuperando uma sale de acordo com o id', async function () {
    sinon.stub(connection, 'execute').resolves([saleId2]);
    const result = await saleModel.findById(2);
    expect(result).to.be.deep.equal(saleId2);
  });

  it('Removendo uma sale de acordo com o id', async function () {
    sinon.stub(connection, 'execute').resolves([removeSale1]);
    const result = await saleModel.deleteSale(1);
    expect(result).to.be.deep.equal(removeSale1);
  });

  it('Atualizando uma sale de acordo com o id', async function () {
    sinon.stub(connection, 'execute').resolves([updatedSale]);
    const { saleId, itemsUpdated } = updatedSale;
    const result = await saleModel.updateSale(saleId, itemsUpdated);
    expect(result).to.be.deep.equal(updatedSale);
  });

  afterEach(function () {
    sinon.restore();
  });
});