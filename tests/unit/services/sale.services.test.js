const { expect } = require('chai');
const sinon = require('sinon');
const { saleService} = require('../../../src/services')
const { saleModel } = require('../../../src/models')
const { sucessSale, wrongZeroQuantityBody, wrongZeroNegativeBody,
  idNotFoundError, allSales, saleId2, updatedSale } = require('./mocks/sale.services.mock')


describe('Testes de unidade do service de sales', function () {
 it('Retorna os dados da venda realizada com sucesso', async function () {
    sinon.stub(saleModel, 'insertNewSaleProduct').resolves(sucessSale);
    // sinon.stub(saleModel, 'findById').resolves(sucessSale.id);
    const result = await saleService.newSale(sucessSale.itemsSold);
    expect(result.type).to.be.deep.equal(null);
    // expect(result.message).to.deep.equal(sucessSale);
  });
  
  it('Retorna status 422 caso quantity seja igual a zero', async function () {
    const result = await saleService.newSale(wrongZeroQuantityBody);
    expect(result.type).to.be.deep.equal('INVALID_VALUE');
    expect(result.message).to.deep.equal('"quantity" must be greater than or equal to 1');
  });

  it('Retorna status 422 caso quantity seja negativa', async function () {
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
  
   it('Retorna status 404 caso id não exista', async function () {
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

  it('Retorna status 404 caso não seja possível realizar uma venda com id inexistente', async function () {
     sinon.stub(saleModel, 'deleteSale').resolves(allSales);
    const result = await saleService.deleteSaleById(99)
    expect(result).to.be.deep.equal(idNotFoundError);
   });
  
  it('Retorna uma sale atualizada conforme id', async function () {
    sinon.stub(saleModel, 'updateSale').resolves(updatedSale);
    const { saleId, itemsUpdated } = updatedSale;
    const result = await saleService.updateSale(saleId, itemsUpdated)
    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.be.deep.equal(updatedSale);
  });

  it('Retorna status 404 caso id não exista no momento da atualização', async function () {
    sinon.stub(saleModel, 'updateSale').resolves(idNotFoundError);
    const { itemsUpdated } = updatedSale;
    const result = await saleService.updateSale(99, itemsUpdated);
    expect(result).to.deep.equal(idNotFoundError);
   });
   afterEach(function () {
    sinon.restore();
  });
});