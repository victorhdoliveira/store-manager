const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products, newProduct } = require('./mocks/product.model.mock');

describe('Testes de unidade do model de products', function () {
  it('Recuperando a lista de products', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productModel.findAll();
    expect(result).to.be.deep.equal(products);
  });

  it('Recuperando um product de acordo com o id', async function () {
    sinon.stub(connection, 'execute').resolves([[products[2]]]);
    const result = await productModel.findById(3);
    expect(result).to.be.deep.equal(products[2]);
  });

  it('Cadastrando um novo product', async function () {
    sinon.stub(connection, 'execute').resolves([[newProduct]]);
    const result = await productModel.insertNewProduct('ProdutoX');
    expect(result).to.be.deep.equal(newProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});