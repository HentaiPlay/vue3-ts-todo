<script setup lang="ts">
  import { computed } from 'vue'
  import { TaskForm, useTaskStore, TaskService } from '@/entities/task'
  import { EnumTaskStatus, ITaskDTO } from '@/entities/task/model/types'

  const props = defineProps<{
    task: ITaskDTO
    isRemoveMode: boolean
  }>()

  const taskStore = useTaskStore()
  const taskService = TaskService()

  const status = computed(() => {
    switch (props.task.status) {
      case EnumTaskStatus.STARTED:
        return { color: 'red', icon: 'cancel' }
      case EnumTaskStatus.COMPLETED:
        return { color: 'green', icon: 'check' }
      default:
        return { color: 'red', icon: 'cancel' }
    }
  })

  // Смена статуса задачи
  const changeStatus = () => {
    // Опредление нового статуса
    let newStatus = EnumTaskStatus.STARTED
    switch (props.task.status) {
      case EnumTaskStatus.STARTED:
        newStatus = EnumTaskStatus.COMPLETED
        break
      case EnumTaskStatus.COMPLETED:
        newStatus = EnumTaskStatus.STARTED
        break
    }
    // Обновление задачи
    taskService.edit({
      ...props.task,
      status: newStatus
    })
  }

  // Чекбокс с выбранной задачей
  const selected = computed<boolean>(() => {
    return taskStore.selectedTasks.includes(props.task.id)
  })
  const onSelectTask = (event: Event) => {
    const isChecked = (event.target as HTMLInputElement).checked
    isChecked ? taskStore.selectTask(props.task.id) : taskStore.removeSelectedTask(props.task.id)
  }
</script>

<template>
  <div class="task-item">
    <!-- Флаг для удаления -->
    <v-checkbox
      v-if="props.isRemoveMode"
      :v-model-value="selected"
      @input="onSelectTask"
      color="error"
      hide-details
    />

    <!-- Статус -->
    <div class="task-item__status">
      <v-chip
        @click="changeStatus"
        :prepend-icon="`mdi-${status.icon}`"
        :color="status.color"
      >
        {{ $t(`tasks.item.status.${props.task.status}`) }}
      </v-chip>
    </div>

    <!-- Название -->
    <div class="task-item__text mx-5">
      <span class="font-weight-bold">{{ props.task.name }}</span>
      <br />
      <span>{{ props.task.description }}</span>
    </div>

    <!-- Редактировать -->
    <TaskForm
      mode="edit"
      :task="props.task"
      class="ml-auto"
    />
  </div>
</template>

<style lang="sass" scoped>
  .task-item
    padding: 10px
    display: flex
    align-items: center
    overflow-y: hidden
    background-color: #fafafa
    border-radius: 10px
    min-width: 700px
    height: 70px
    transition: .3s
    &:hover
      background-color: #ffedf6
  .task-item__status
    width: 150px
    user-select: none
  .task-item__text
    max-height: 50px
    max-width: 300px
    overflow: hidden
</style>
