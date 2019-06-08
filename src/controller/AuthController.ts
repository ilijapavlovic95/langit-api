import { User } from './../entity/User';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import config from '../config/config';

export class AuthController {
  static login = async (req: Request, res: Response) => {
    // check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }

    // get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      res.status(401).send();
    }

    // check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    // sign JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    //Send the jwt in the response
    res.header('Authorization', token).send('Login successfull.');
  };
}
