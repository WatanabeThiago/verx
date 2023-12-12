import "reflect-metadata"
import AppError from "@shared/errors/AppError";
import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import authConfig from '@config/auth';
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "@shared/container/HashProvider/models/IHashProvider";

export type AuthenticateUserReq = {
  email: string;
  password: string;
};

interface IResponse {
  user: User;
  accessToken: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({
    email,
    password
  }: AuthenticateUserReq): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Combinação de email/senha incorreta!', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Combinação de email/senha incorreta!', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(
      {
        data: {
          id: user.id,
        },
      },
      secret,
      {
        subject: user.id,
        expiresIn,
      },
    );

    return {
      user,
      accessToken: token,
    };
  }
}

export default AuthenticateUserService;
