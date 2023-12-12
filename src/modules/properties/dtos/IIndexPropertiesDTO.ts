export default interface IIndexPropertiesDTO {
  person: {
    nationalDocument?: string
  }
  products: {
    productId?: number
  },
  city?: string
  state?: string
  country?: string
}
