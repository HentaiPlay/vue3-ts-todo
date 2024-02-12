export enum EnumTaskStatus {
  STARTED = 1,
  COMPLETED = 2
}

export interface ICreateTaskDTO {
  name: string
  description: string
}

export interface ITaskDTO extends ICreateTaskDTO {
  id: string
  status: EnumTaskStatus
}
