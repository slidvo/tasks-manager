import { TaskStatus } from "@src/generated/prisma/enums";
import { UserDto } from "@src/models/User.model";

export type RegisterResponse = {
  id: number;
  jwt: string;
};

export type LoginResponse = {
  jwt: string;
};

export type ProjectsInfoResponse = {
  id: number;
  name: string;
  description: string;
  tasks: {
    status: TaskStatus,
    performer: UserDto
  }[]
}[];