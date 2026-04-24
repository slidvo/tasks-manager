import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import UserDto from '@src/models/User.model';
import RegistrationService from '@src/services/RegistrationService';

import { Req, Res } from './common/express-types';
import parseReq from './common/parseReq';

const reqValidators = {
  add: parseReq({ user: UserDto.isComplete }),
} as const;

 /**
  * @route POST /api/auth/register
  * @desc Register a new user.
  */
async function register(req: Req, res: Res) {
  const { user } = reqValidators.add(req.body);
  const result = await RegistrationService.register(user);
  res.status(HttpStatusCodes.CREATED).json(result);
}

export default {
  register,
} as const;
