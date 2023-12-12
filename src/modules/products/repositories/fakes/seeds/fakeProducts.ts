import Product from "@modules/products/infra/typeorm/entities/Product";

const fakeSoja = new Product()
Object.assign(fakeSoja, {
  id: 1,
  active: true,
  name: 'Soja'
})

const fakeMilho = new Product()
Object.assign(fakeMilho, {
  id: 2,
  active: true,
  name: 'Milho'
})

const fakeAlgodao = new Product()
Object.assign(fakeAlgodao, {
  id: 3,
  active: true,
  name: 'Algodao'
})

const fakeCoffee = new Product()
Object.assign(fakeCoffee, {
  id: 4,
  active: true,
  name: 'Coffee'
})
const fakeSugarCane = new Product()
Object.assign(fakeSugarCane, {
  id: 5,
  active: true,
  name: 'SugarCane'
})


export {
  fakeAlgodao,
  fakeCoffee,
  fakeMilho,
  fakeSoja,
  fakeSugarCane
}
