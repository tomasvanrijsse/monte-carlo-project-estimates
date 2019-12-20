<template>
  <div>
    <v-btn v-on:click="addNewItem('top')" color="primary" dark class="mb-2">
      New Task
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="tasks"
    >
      <template v-slot:item="{ item }">
        <Task :task="item" />
      </template>
    </v-data-table>
    <v-btn v-on:click="addNewItem('bottom')" color="primary" dark class="mb-2 mt-2">
      New Task
    </v-btn>
  </div>
</template>

<script>
import Task from './Task'
export default {
  name: 'TaskList',
  components: { Task },
  data () {
    return {
      headers: [
        {
          text: 'Task description',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Low', value: 'low' },
        { text: 'Target', value: 'target' },
        { text: 'High', value: 'high' },
        { text: 'Actions', value: 'action', sortable: false }
      ]
    }
  },
  computed: {
    tasks () {
      return this.$store.state.tasks.list
    }
  },
  methods: {
    addNewItem (location) {
      this.$store.commit('tasks/add', location)
    }
  }
}
</script>

<style>
  .number {
    max-width: 50px;
    text-align: center;
  }
</style>
