<script setup lang="ts">
  import { ref, reactive, computed } from 'vue'
  import { isEqual } from 'lodash'
  import { TaskService } from '@/entities/task'
  import { ITaskDTO } from '../model/types'
  const taskService = TaskService()

  const props = defineProps<{
    mode: 'create' | 'edit'
    task?: ITaskDTO
  }>()

  // Модалка
  const dialog = ref<boolean>(false)
  const open = () => {
    dialog.value = true
    if (props.mode === 'edit') {
      formData.name = props.task?.name ?? ''
      formData.description = props.task?.description ?? ''
    }
  }
  const close = () => {
    clear()
    dialog.value = false
  }

  // Форма
  const formData = reactive({
    name: '',
    description: ''
  })
  const clear = () => {
    ;(formData.name = ''), (formData.description = '')
  }
  const save = () => {
    switch (props.mode) {
      // Создание
      case 'create':
        taskService.create(formData)
        break
      // Редактирвание
      case 'edit':
        if (props.task) {
          taskService.edit({
            id: props.task.id,
            status: props.task.status,
            ...formData
          })
        }
        break
    }
    close()
  }
  const remove = () => {
    if (props.task) {
      taskService.remove([props.task.id])
    }
  }

  const disabled = computed(() => {
    const oldData = { name: props.task?.name, description: props.task?.description }
    switch (props.mode) {
      case 'create':
        return formData.name === '' || formData.description === ''
      case 'edit':
        return isEqual(oldData, formData)
      default:
        return true
    }
  })
</script>

<template>
  <div>
    <!-- Кнопка создать -->
    <v-btn
      v-if="props.mode === 'create'"
      @click="open"
      variant="outlined"
      type="primary"
      theme="dark"
    >
      {{ $t('tasks.actions.create') }}
    </v-btn>

    <!-- Кнопка редактирвания -->
    <v-btn
      v-if="props.mode === 'edit'"
      @click="open"
      icon="mdi-lead-pencil"
      size="small"
      color="green-lighten-1"
      class="elevation-0"
    />

    <!-- Модалка формы -->
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card v-if="dialog">
        <v-card-title>
          {{ $t(`tasks.form.${props.mode}.title`) }}
        </v-card-title>

        <v-card-text>
          <!-- Название -->
          <v-text-field
            v-model="formData.name"
            :label="$t('tasks.form.fields.name.label')"
            :placeholder="$t('tasks.form.fields.name.placeholder')"
            variant="outlined"
            hide-details="auto"
            class="mb-5"
          />

          <!-- Описание -->
          <v-textarea
            v-model="formData.description"
            :label="$t('tasks.form.fields.description.label')"
            :placeholder="$t('tasks.form.fields.description.placeholder')"
            variant="outlined"
            hide-details="auto"
          />
        </v-card-text>

        <v-card-actions class="d-flex justify-space-between px-5">
          <!-- Сохранить -->
          <v-btn
            @click="save"
            variant="outlined"
            type="primary"
            color="success"
            :disabled="disabled"
          >
            {{ $t(`tasks.form.${props.mode}.saveButton`) }}
          </v-btn>

          <!-- Удалить -->
          <v-btn
            v-if="props.mode === 'edit'"
            @click="remove"
            variant="outlined"
            type="primary"
            color="error"
          >
            {{ $t('tasks.actions.remove') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="sass" scoped></style>
