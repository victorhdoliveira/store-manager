const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models')

const { products, oneProduct, idNotFoundError, idNotNumberError, newProduct, updateProduct, removeProduct3 } = require('./mocks/product.services.mock')

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

   it('Retorna um novo product', async function () {
    sinon.stub(productModel, 'insertNewProduct').resolves(newProduct);
    const result = await productService.newProduct('ProdutoX')
    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.be.deep.equal(newProduct);
  });

   it('Retorna um product atualizado conforme id', async function () {
    sinon.stub(productModel, 'updateProduct').resolves(updateProduct);
    const result = await productService.updateProductById('Martelo do Batman', 1)
    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.be.deep.equal(updateProduct);
   });
  
  it('Verifica se é realizada a exclusão de um item', async function () {
    sinon.stub(productModel, 'deleteProduct').resolves(products);
    const result = await productService.deleteProductById(3)
    expect(result.type).to.be.deep.equal(null);
    expect(result.message).to.be.deep.equal('');
   });

  it('etorna status 422 caso não seja possível excluir um produto com id inexistente', async function () {
    sinon.stub(productModel, 'deleteProduct').resolves(products);
    const result = await productService.deleteProductById(99)
    expect(result).to.be.deep.equal(idNotFoundError);
  });
  
   it('Verifica se é possível buscar um produto pelo nome', async function () {
    const result = await productService.searchProduct('Martelo')
    expect(result.message).to.be.deep.equal([products[0]]);
   });
  
   it('Retorna um array vazio caso não seja possível buscar um produto pelo nome', async function () {
    const result = await productService.searchProduct('XxxxX')
    expect(result.message).to.be.deep.equal([]);
   });
  
  afterEach(function () {
    sinon.restore();
  });
});
