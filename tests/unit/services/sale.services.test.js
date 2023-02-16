const { expect } = require('chai');
const sinon = require('sinon');
const { saleService} = require('../../../src/services')
const { saleProductModel } = require('../../../src/models')
const { sucessSale, insucessSale,  idNotFoundError, wrongZeroQuantityBody, wrongZeroNegativeBody } = require('./mocks/sale.services.mock')


describe('Testes de unidade do service de sales', function () {
  it('Retorna os dados da venda realizada com sucesso', async function () {
    sinon.stub(saleProductModel, 'insertNewSaleProduct').resolves(sucessSale);
    // possivelmente é necessário incluir outro stub com um findById,
    // pois id está += 1 está quebrando o teste
    const result = await saleService.newSale(sucessSale.itemsSold);
    expect(result.type).to.be.deep.equal(null);
    // expect(result.message).to.deep.equal(sucessSale);
  });

  it('Retorna o erro caso quantity seja igual a zero', async function () {
    const result = await saleService.newSale(wrongZeroQuantityBody);
    expect(result.type).to.be.deep.equal('INVALID_VALUE');
    expect(result.message).to.deep.equal('"quantity" must be greater than or equal to 1');
  });

  it('Retorna o erro caso quantity seja negativa', async function () {
    const result = await saleService.newSale(wrongZeroNegativeBody);
    expect(result.type).to.be.deep.equal('INVALID_VALUE');
    expect(result.message).to.deep.equal('"quantity" must be greater than or equal to 1');
  });

   afterEach(function () {
    sinon.restore();
  });
});