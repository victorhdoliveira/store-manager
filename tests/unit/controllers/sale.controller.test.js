const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { saleController } = require('../../../src/controllers')
const { saleService } = require('../../../src/services')
const { sucessSale } = require('./mocks/sale.controller.mock')

describe('Testes de unidade do controller de sale', function () {
  it('Verifica se é criado uma nova sale', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(saleService, 'newSale')
      .resolves({ type: null, message: sucessSale });
    await saleController.insertProduct(req, res)

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(sucessSale);
  });
});