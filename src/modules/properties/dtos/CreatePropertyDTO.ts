import Person from "@modules/users/infra/typeorm/entities/Person";
import { Point } from "geojson";

export default interface CreatePropertyDTO {
  id: string;
  name: string;
  country: string;
  state: string;
  city: string;
  line1: string;
  line2: string;
  totalArea: number;
  agriculturalArea: number;
  vegetationArea: number;

  geolocation: Point

  person: Person
  products: {
    propertyId: string
    productId: number
    active: boolean
  }[]
}
