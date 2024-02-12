import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { EnumTaskStatus, ITaskDTO } from '@/entities/task/model/types'

export const useTaskStore = defineStore('task', () => {
  // state
  const tasks = ref<ITaskDTO[]>([])
  const filterStatus = ref<number>(0)
  const selectedTasks = ref<string[]>([])

  // getters
  const tasksList = computed<ITaskDTO[]>(() => {
    switch (filterStatus.value) {
      case +EnumTaskStatus.STARTED:
      case +EnumTaskStatus.COMPLETED:
        return tasks.value.filter((task) => +task.status === filterStatus.value)
      default:
        return tasks.value
    }
  })

  // actions
  // CRUD
  function add(dto: ITaskDTO) {
    tasks.value.push(dto)
  }
  function edit(dto: ITaskDTO) {
    const index = tasks.value.findIndex((task) => task.id === dto.id)
    if (index !== -1) {
      tasks.value.splice(index, 1, dto)
    }
  }
  function remove(dto: string[]) {
    tasks.value = tasks.value.filter((task) => !dto.includes(task.id))
  }
  // Выбранные задачи
  function selectTask(id: string) {
    selectedTasks.value.push(id)
  }
  function removeSelectedTask(id: string) {
    const index = selectedTasks.value.findIndex((el) => el === id)
    selectedTasks.value.splice(index, 1)
  }
  function clearSelectedTask() {
    selectedTasks.value = []
  }

  return {
    tasks,
    tasksList,
    selectedTasks,
    filterStatus,
    add,
    edit,
    remove,
    selectTask,
    removeSelectedTask,
    clearSelectedTask
  }
})
