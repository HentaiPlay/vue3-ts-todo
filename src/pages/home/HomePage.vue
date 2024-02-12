<script setup lang="ts">
  import { TaskList } from '@/entities/task'
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="task-list-wrapper">
          <TaskList />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="sass" scoped>
  .task-list-wrapper
    display: flex
    justify-content: center
</style>
