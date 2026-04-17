import { isNonEmptyString, isString } from 'jet-validators';
import { parseObject, Schema, testObject } from 'jet-validators/utils';

/******************************************************************************
                                 Constants
******************************************************************************/

const GetDefaults = (): ProjectDto => ({
  name: '',
  description: '',
});

const schema: Schema<ProjectDto> = {
  name: isString,
  description: isString,
};

/******************************************************************************
                                  Types
******************************************************************************/

export interface ProjectDto {
  /** Название проекта (обязательное поле) */
  name: string;
  /** Краткое описание проекта (опционально) */
  description?: string;
}

/******************************************************************************
                                  Setup
******************************************************************************/

const parseProject = parseObject<ProjectDto>(schema);

const isCompleteProject = testObject<ProjectDto>({
  ...schema,
  name: isNonEmptyString,
});

/******************************************************************************
                                 Functions
******************************************************************************/

/**
 * New project object.
 */
function new_(project?: Partial<ProjectDto>): ProjectDto {
  return parseProject({ ...GetDefaults(), ...project }, (errors) => {
    throw new Error(
      'Setup new project failed ' + JSON.stringify(errors, null, 2),
    );
  });
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  new: new_,
  isComplete: isCompleteProject,
} as const;
