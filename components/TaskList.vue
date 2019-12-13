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
        <tr>
          <td>
            <v-text-field
              v-model="item.name"
              placeholder="Task name"
            />
          </td>
          <td>
            <v-text-field v-model="item.low" class="number" />
          </td>
          <td>
            <v-text-field v-model="item.target" class="number" />
          </td>
          <td>
            <v-text-field v-model="item.high" class="number" />
          </td>
          <td>
            <v-icon @click="deleteItem()" small>
              mdi-delete
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-btn v-on:click="addNewItem('bottom')" color="primary" dark class="mb-2 mt-2">
      New Task
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
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
      ],
      tasks: [{
        name: 'Task 1',
        low: 1,
        target: 4,
        high: 10
      }]
    }
  },
  methods: {
    deleteItem (item) {
      const index = this.tasks.indexOf(item)
      confirm('Are you sure you want to delete this task?') && this.tasks.splice(index, 1)
    },
    addNewItem (location) {
      const emptyTask = {
        name: '',
        low: null,
        target: null,
        high: null
      }
      if (location === 'top') {
        this.tasks.unshift(emptyTask)
      } else {
        this.tasks.push(emptyTask)
      }
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
