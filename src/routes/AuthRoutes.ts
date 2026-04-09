import { isNumber } from 'jet-validators';
import { transform } from 'jet-validators/utils';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import UserDto from '@src/models/User.model';
import UserService from '@src/services/UserService';

import { Req, Res } from './common/express-types';
import parseReq from './common/parseReq';

const reqValidators = {
  add: parseReq({ user: UserDto.isComplete }),
  update: parseReq({ user: UserDto.isComplete }),
  delete: parseReq({ id: transform(Number, isNumber) }),
} as const;

async function register(req: Req, res: Res) {
  const { user } = reqValidators.add(req.body);
  const result = await UserService.register(user);
  res.status(HttpStatusCodes.CREATED).json(result);
}

export default {
  register,
} as const;
