import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  // get the jwt token from the head
  const authHeader = <string>req.headers['Authorization'];
  if (!authHeader.startsWith('Bearer ')) {
    res.status(401).send();
    return;
  }
  const token = authHeader.substring(7, authHeader.length);

  let jwtPayload;

  // try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    // if token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  // the token is valid for 1 hour
  // we want to send a new token on every request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: '1h'
  });
  res.setHeader('Authorization', newToken);
  next();
};
