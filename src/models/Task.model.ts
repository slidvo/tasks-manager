import { isNonEmptyString, isString } from 'jet-validators';
import { parseObject, Schema, testObject } from 'jet-validators/utils';

import { transformIsDate } from '@src/common/utils/validators';

/******************************************************************************
                                 Constants
******************************************************************************/

const GetDefaults = (): TaskDto => ({
  name: '',
  description: '',
  deadline: new Date(''),
});

const schema: Schema<TaskDto> = {
  name: isString,
  description: isString,
  deadline: transformIsDate,
};

/******************************************************************************
                                  Types
******************************************************************************/

export interface TaskDto {
  /** Название задачи (обязательное поле) */
  name: string;
  /** Описание задачи (опционально) */
  description?: string;
  /** Срок выполнения задачи (обязательное поле) */
  deadline: Date;
}

/******************************************************************************
                                  Setup
******************************************************************************/

const parseTask = parseObject<TaskDto>(schema);

const isCompleteTask = testObject<TaskDto>({
  ...schema,
  name: isNonEmptyString,
});

/******************************************************************************
                                 Functions
******************************************************************************/

/**
 * New task object.
 */
function new_(task?: Partial<TaskDto>): TaskDto {
  return parseTask({ ...GetDefaults(), ...task }, (errors) => {
    throw new Error('Setup new task failed ' + JSON.stringify(errors, null, 2));
  });
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  new: new_,
  isComplete: isCompleteTask,
} as const;
