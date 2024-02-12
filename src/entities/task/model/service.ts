import { EnumTaskStatus, ICreateTaskDTO, ITaskDTO } from '@/entities/task/model/types'
import { useTaskStore } from '@/entities/task'
import { generateUUID } from '@/shared/utils/helpers'
import { ls, getKeysByPreffix } from '@/shared/utils/localStorage'

export default function TaskService() {
  const taskStore = useTaskStore()

  return {
    // Запись всех задач в стор из localStorage (при инициализации)
    setAllTasks() {
      const keys = getKeysByPreffix('task_')
      keys.forEach((key) => {
        const lsItem = ls.get(key)
        if (lsItem) {
          const task = JSON.parse(lsItem) as ITaskDTO
          taskStore.add(task)
        }
      })
    },

    // Создание задачи
    create(dto: ICreateTaskDTO) {
      const uuid = `task_${generateUUID()}`
      const taskDto = {
        id: uuid,
        status: EnumTaskStatus.STARTED,
        ...dto
      }
      // Запись в localStorage
      ls.set(taskDto.id, JSON.stringify(taskDto))
      // Запись в стор
      taskStore.add(taskDto)
    },

    // Редактирование задачи
    edit(dto: ITaskDTO) {
      ls.set(dto.id, JSON.stringify(dto))
      taskStore.edit(dto)
    },

    // Удаление задач (режим удаления по заданию должен быть мультипл)
    remove(dto: string[]) {
      // Удаляем из localStorage
      dto.forEach((key) => ls.remove(key))
      // Удаляем из стора
      taskStore.remove(dto)
    }
  }
}
