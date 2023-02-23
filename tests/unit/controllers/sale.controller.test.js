const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { saleController } = require('../../../src/controllers')
const { saleService } = require('../../../src/services')
const { sucessSale, allSales, saleId2, notFoundError, updatedSale } = require('./mocks/sale.controller.mock')

describe('Testes de unidade do controller de sale', function () {
  it('Verifica se é criado uma nova sale', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(saleService, 'newSale')
      .resolves({ type: null, message: sucessSale });
    await saleController.insertSale(req, res)

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(sucessSale);
  });
   it('Retorna status 404 caso não seja possível criar uma nova sale', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(saleService, 'newSale')
      .resolves(notFoundError);
    await saleController.insertSale(req, res)

    expect(res.status).to.have.been.calledWith(404);
  });
  it('Verifica se é possível buscar por todas as sales', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(saleService, 'findAll')
      .resolves({ type: null, message: allSales });
    await saleController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSales);
  });
  it('Retorna status 404 caso não seja possível listar todas as sales', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(saleService, 'findAll')
      .resolves(notFoundError);
    await saleController.getAllSales(req, res)

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(notFoundError.message);
   });
  it('Verifica se é possível buscar as sales de acordo com o id', async function () {
    const res = {};
    const req = { params: { id: 2 }};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(saleService, 'findById')
      .resolves({ type: null, message: saleId2 });
    await saleController.getSalesById(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleId2);
  });
   it('Retorna status 404 caso id não exista', async function () {
    const res = {};
    const req = { params: { id: 99 }};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(saleService, 'findById')
      .resolves(notFoundError);
    await saleController.getSalesById(req, res)

    expect(res.status).to.have.been.calledWith(404);
   });
  
  it('Verifica se é possível excluir uma venda', async function () {
    const res = {};
    const req = { params: { id: 1 }};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(saleService, 'deleteSaleById')
      .resolves({ type: null, message: '' });
    await saleController.deleteSaleById(req, res)

    expect(res.status).to.have.been.calledWith(204);
  });

  it('Retorna status 404 caso id caso haja exclusão uma venda com id inexistente', async function () {
    const res = {};
    const req = { params: { id: 99 }};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(saleService, 'deleteSaleById')
      .resolves(notFoundError);
    await saleController.deleteSaleById(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });
  
  it('Verifica se é possível atualizar uma sale de acordo com seu id', async function () {
     const { itemsUpdated, saleId  } = updatedSale;
    const res = {};
    const req = { body: itemsUpdated, params: saleId };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(saleService, 'updateSale')
      .resolves({ type: null, message: updatedSale });
    await saleController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedSale);
  });
  
  it('Retorna status 404 caso id caso não seja possível atualizar uma venda', async function () {
     const { itemsUpdated  } = updatedSale;
    const res = {};
    const req = { body: itemsUpdated, params: 99 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(saleService, 'updateSale')
      .resolves(notFoundError);
    await saleController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });
    afterEach(function () {
    sinon.restore();
  });
});