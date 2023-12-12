import { fakeCoffee, fakeSoja } from "@modules/products/repositories/fakes/seeds/fakeProducts"
import Property from "@modules/properties/infra/typeorm/entities/Property"
import PropertyProduct from "@modules/properties/infra/typeorm/entities/PropertyProduct"

const fakeProperty = new Property()

const fakePropertyProductSoja = new PropertyProduct()
const fakePropertyProductCoffee = new PropertyProduct()
Object.assign(fakePropertyProductSoja, {
  id: 'uuid',
  propertyId: 'uuiid',
  productId: fakeSoja.id
})
Object.assign(fakePropertyProductCoffee, {
  id: 'uuid',
  propertyId: 'uuiid',
  productId: fakeCoffee.id
})

Object.assign(fakeProperty,
  {
    id: 'uuiid',
    name: "Thiago Watanabe",
    nationalDocument: "000000",

    country: "BR",
    state: "MS",
    city: "Campo Grande",
    line1: "Rua Levi Campanha, 109",
    line2: "",
    agriculturalArea: 100,
    vegetationArea: 200,
    totalArea: 10000,
    products: [
      fakePropertyProductSoja,
      fakePropertyProductCoffee,
    ]
  })


export default fakeProperty
