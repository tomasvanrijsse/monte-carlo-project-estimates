<template>
  <v-layout column>
    <v-row>
      <v-col cols="12" md="6">
        <TaskList />
      </v-col>
      <v-col cols="12" md="6">
        <Graph />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import Graph from '../components/Graph'
import TaskList from '~/components/TaskList'

export default {
  components: {
    TaskList,
    Graph
  }
}
</script>
