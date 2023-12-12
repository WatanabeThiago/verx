import User from "@modules/users/infra/typeorm/entities/User"
import fakePerson from "./fakePerson"

const fakeUser = new User()

Object.assign(fakeUser,
  {
    id: 'uuiid',
    email: 'watanabe.thiago4@gmail.com',
    password: 'hashed',
    person: fakePerson,
    createdAt: new Date()
  }
)

export default fakeUser
