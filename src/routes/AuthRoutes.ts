import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import UserDto from '@src/models/User.model';
import AuthService from '@src/services/AuthService';

import { Req, Res } from './common/express-types';
import parseReq from './common/parseReq';
import { isNonEmptyString } from 'jet-validators';

const reqValidators = {
  add: parseReq({ user: UserDto.isComplete }),
  login: parseReq({ email: isNonEmptyString, password: isNonEmptyString }),
} as const;

/**
 * @route POST /api/auth/register
 * @desc Register a new user.
 */
async function register(req: Req, res: Res) {
  const { user } = reqValidators.add(req.body);
  const result = await AuthService.register(user);
  res.status(HttpStatusCodes.CREATED).json(result);
}

/**
 * @route POST /api/auth/login
 * @desc Authenticate user and return a JWT token. 
 * @param req 
 * @param res 
 */
async function login(req: Req, res: Res) {
  //TODO crypt pass and save in DB
  //TODO add decrypt pass and compare it with pass fron rq 
  const { email, password } = reqValidators.login(req.body);
  const result = await AuthService.login(email);
  res.status(HttpStatusCodes.OK).json(result);
}

export default {
  register,
  login,
} as const;
