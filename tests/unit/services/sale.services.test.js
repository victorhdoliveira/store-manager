const { expect } = require('chai');
const sinon = require('sinon');
const { saleService} = require('../../../src/services')
const { saleProductModel, saleModel } = require('../../../src/models')
const { sucessSale, wrongZeroQuantityBody, wrongZeroNegativeBody, idNotFoundError, allSales, saleId2} = require('./mocks/sale.services.mock')


describe('Testes de unidade do service de sales', function () {
 it('Retorna os dados da venda realizada com sucesso', async function () {
    sinon.stub(saleProductModel, 'insertNewSaleProduct').resolves(sucessSale);
    // sinon.stub(saleModel, 'findById').resolves(sucessSale.id);
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

  it('Retorna a lista de sales', async function () {
    sinon.stub(saleModel, 'findAll').resolves(allSales);
    const result = await saleService.findAll();
    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.deep.equal(allSales);
  });

   it('Retorna a lista de sales de acordo com o id', async function () {
    sinon.stub(saleModel, 'findById').resolves(saleId2);
    const result = await saleService.findById(2);
    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.deep.equal(saleId2);
  });
  
   it('Retorna mensagem de erro caso id não exista', async function () {
    sinon.stub(saleModel, 'findById').resolves(idNotFoundError);
    const result = await saleService.findById(99);
    expect(result).to.deep.equal(idNotFoundError);
   });
  
  it('Verifica se é realizada a exclusão de uma venda', async function () {
    sinon.stub(saleModel, 'deleteSale').resolves(allSales);
    const result = await saleService.deleteSaleById(2)
    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.be.deep.equal('');
   });

  it('Verifica se não é possível excluir uma venda com id inexistente', async function () {
     sinon.stub(saleModel, 'deleteSale').resolves(allSales);
    const result = await saleService.deleteSaleById(99)
    expect(result).to.be.deep.equal(idNotFoundError);
   });
  
  
   afterEach(function () {
    sinon.restore();
  });
});