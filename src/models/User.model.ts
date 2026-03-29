import { isNonEmptyString, isString, isUnsignedInteger } from 'jet-validators';
import { parseObject, Schema, testObject } from 'jet-validators/utils';

// import { transformIsDate } from '@src/common/utils/validators';

// import { Entity } from './common/types';

/******************************************************************************
                                 Constants
******************************************************************************/

const GetDefaults = (): UserDto => ({
  name: '',
  email: '',
});

const schema: Schema<UserDto> = {
  name: isString,
  email: isString,
};

/******************************************************************************
                                  Types
******************************************************************************/

/**
 * @entity users
 */
export interface UserDto {
  name: string;
  email: string;
}

/******************************************************************************
                                  Setup
******************************************************************************/

// Set the "parseUser" function
const parseUser = parseObject<UserDto>(schema);

// For the APIs make sure the right fields are complete
const isCompleteUser = testObject<UserDto>({
  ...schema,
  name: isNonEmptyString,
  email: isNonEmptyString,
});

/******************************************************************************
                                 Functions
******************************************************************************/

/**
 * New user object.
 */
function new_(user?: Partial<UserDto>): UserDto {
  return parseUser({ ...GetDefaults(), ...user }, (errors) => {
    throw new Error('Setup new user failed ' + JSON.stringify(errors, null, 2));
  });
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  new: new_,
  isComplete: isCompleteUser,
} as const;
