import Person from "@modules/users/infra/typeorm/entities/Person"

const fakePerson = new Person()

Object.assign(fakePerson,
  {
    id: 'uuiid',
    name: "Thiago Watanabe",
    nationalDocument: "000000"
  })


export default fakePerson
