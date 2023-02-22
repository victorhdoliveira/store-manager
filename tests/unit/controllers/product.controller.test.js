const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productController } = require('../../../src/controllers')
const { productService } = require('../../../src/services')
const { products, oneProduct, newProduct, notFoundError, updateProduct } = require('./mocks/product.controller.mock')

describe('Testes de unidade do controller de products', function () {
  it('Verifica se é possível buscar por todos os produtos', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'findAll')
      .resolves({ type: null, message: products });
    await productController.getAllProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });
  it('Retorna status 404 caso não seja possível buscar todos os produtos', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'findAll')
      .resolves(notFoundError);
    await productController.getAllProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(notFoundError.message);
  });
  it('Verifica se a função de buscar os produtos de acordo com o id é realizada com sucesso', async function () {
    const res = {};
    const req = { params: { id: 1 }};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'findById')
      .resolves({ type: null, message: oneProduct });
    await productController.getProductById(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(oneProduct);
  });
  it('Retorna status 404 caso não seja possível buscar os produtos de acordo com o id', async function () {
    const res = {};
    const req = { params: { id: 1 }};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'findById')
      .resolves(notFoundError);
    await productController.getProductById(req, res)

    expect(res.status).to.have.been.calledWith(404);
  });
   it('Verifica se é possível incluir um novo product', async function () {
    const res = {};
    const req = { body: { name: 'ProdutoX' }};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'newProduct')
      .resolves({ type: null, message: newProduct });
    await productController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
   });
  it('Retorna status 404 caso não seja possível incluir um novo produto', async function () {
    const res = {};
    const req = { body: { name: 'ProdutoX' }};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'newProduct')
      .resolves(notFoundError);
    await productController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });
  it('Verifica se é possível atualizar um produto de acordo com seu id', async function () {
    const res = {};
    const req = { body: { name: 'Martelo do Batman' }, params: { id: 1 }};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'updateProductById')
      .resolves({ type: null, message: updateProduct });
    await productController.updateProduct(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updateProduct);
  });
  it('Retorna status 404 caso não seja possível atualizar um produto', async function () {
    const res = {};
    const req = { body: { name: 'Martelo do Batman' }, params: { id: 1 }};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'updateProductById')
      .resolves(notFoundError);
    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });
   afterEach(function () {
    sinon.restore();
  });
  it('Verifica se é possível excluir product', async function () {
    const res = {};
    const req = { params: { id: 1 }};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'deleteProductById')
      .resolves({ type: null, message: '' });
    await productController.deleteProductById(req, res)

    expect(res.status).to.have.been.calledWith(204);
  });
  it('Verifica se é possível excluir product com id inexistente', async function () {
    const res = {};
    const req = { params: { id: 99 }};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'deleteProductById')
      .resolves(notFoundError);
    await productController.deleteProductById(req, res)

    expect(res.status).to.have.been.calledWith(404);
   });
});