const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models')

const { products, oneProduct, idNotFoundError, idNotNumberError } = require('./mocks/product.services.mock')

describe('Testes de unidade do service de products', function () {
  it('Retorna a lista de products', async function () {
    sinon.stub(productModel, 'findAll').resolves(products);
    const result = await productService.findAll();
    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.deep.equal(products);
  });

  it('Retorna um product de acordo com o id', async function () {
    sinon.stub(productModel, 'findById').resolves(oneProduct);
    const result = await productService.findById(1);
    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.be.deep.equal(oneProduct);
  });

  it('Retorna mensagem de erro caso id não exista', async function () {
    sinon.stub(productModel, 'findById').resolves(idNotFoundError);
    const result = await productService.findById(99);
    expect(result.message).to.be.deep.equal(idNotFoundError);
  });

  it('Retorna mensagem de erro caso id não seja um número', async function () {
    sinon.stub(productModel, 'findById').resolves(idNotNumberError);
    const result = await productService.findById('x');
    expect(result).to.be.deep.equal(idNotNumberError);
  });


  afterEach(function () {
    sinon.restore();
  });
});