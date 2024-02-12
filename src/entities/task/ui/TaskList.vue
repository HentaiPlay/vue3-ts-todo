<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { EnumTaskStatus } from '@/entities/task/model/types'
  import { TaskForm, TaskItem, useTaskStore, TaskService } from '@/entities/task'

  const { t } = useI18n()
  const taskStore = useTaskStore()
  const taskService = TaskService()

  const isRemoveMode = ref<boolean>(false)

  const filterStatusItems = [
    { title: t('tasks.list.filter.0'), value: 0 },
    { title: t(`tasks.list.filter.${EnumTaskStatus.STARTED}`), value: +EnumTaskStatus.STARTED },
    { title: t(`tasks.list.filter.${EnumTaskStatus.COMPLETED}`), value: +EnumTaskStatus.COMPLETED }
  ]

  const remove = () => {
    // Удаление задач
    taskService.remove(taskStore.selectedTasks)
    // Очистка состояния
    isRemoveMode.value = false
    taskStore.clearSelectedTask()
  }

  watch(isRemoveMode, () => {
    if (!isRemoveMode.value) {
      taskStore.clearSelectedTask()
    }
  })

  onMounted(() => {
    if (!taskStore.tasks.length) {
      taskService.setAllTasks()
    }
  })
</script>

<template>
  <div class="task-list">
    <!-- Панель -->
    <div class="task-list__panel">
      <!-- Создать задачу -->
      <TaskForm mode="create" />

      <!-- Фильтр -->
      <v-select
        class="ml-5 mr-auto"
        v-model="taskStore.filterStatus"
        variant="outlined"
        hideDetails
        density="compact"
        width="100"
        :items="filterStatusItems"
      />

      <!-- Удалить -->
      <v-btn
        v-if="isRemoveMode"
        @click="remove"
        :disabled="!taskStore.selectedTasks.length"
        variant="outlined"
        type="primary"
        color="error"
        class="ml-5"
      >
        {{ $t('tasks.actions.remove') }}
      </v-btn>

      <!-- Режим удаления -->
      <v-checkbox
        v-model="isRemoveMode"
        :label="$t('tasks.list.removeMode')"
        class="ml-5"
        hideDetails
      />
    </div>
    <!-- Задачи -->
    <div
      v-if="taskStore.tasksList.length"
      class="task-list__body"
    >
      <TaskItem
        v-for="task in taskStore.tasksList"
        :key="task.id"
        :task="task"
        :isRemoveMode="isRemoveMode"
      />
    </div>
    <!-- Заглушка -->
    <div
      v-else
      class="task-list__stub"
    >
      {{ $t('tasks.list.stub') }}
    </div>
  </div>
</template>

<style lang="sass" scoped>
  .task-list
    max-width: 720px
    display: flex
    flex-direction: column
    justify-content: center
  .task-list__panel
    margin: 10px
    padding: 10px 20px
    display: flex
    align-items: center
    max-width: 700px
    border-radius: 10px
    background-color: #fafafa
  .task-list__body
    padding: 10px
    display: grid
    gap: 10px
  .task-list__stub
    height: 80px
    width: 700px
    margin: 10px
    display: flex
    align-items: center
    justify-content: center
    border-radius: 10px
    border: 1px dashed grey
</style>
