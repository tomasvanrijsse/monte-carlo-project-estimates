<template>
  <v-layout column>
    <v-row>
      <v-col cols="12" md="6">
        <TaskList @taskListUpdated="updateChart" />
      </v-col>
      <v-col cols="12" md="6">
        <Chart :tasks="tasks" />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import Chart from '../components/Chart'
import TaskList from '~/components/TaskList'

export default {
  components: {
    TaskList,
    Chart
  },
  data () {
    return {
      tasks: []
    }
  },
  methods: {
    updateChart (tasks) {
      this.tasks = tasks
    }
  }
}
</script>
