<template>
  <v-data-table
    :headers="headers"
    :items="tasks"
  >
    <template v-slot:item.name="{ item }">
      <v-text-field
        v-model="item.name"
        placeholder="Task name"
      />
    </template>

    <template v-slot:item.low="{ item }">
      <v-text-field v-model="item.low" class="number" />
    </template>

    <template v-slot:item.target="{ item }">
      <v-text-field v-model="item.target" class="number" />
    </template>

    <template v-slot:item.high="{ item }">
      <v-text-field v-model="item.high" class="number" />
    </template>

    <template v-slot:item.action="{ item }">
      <v-icon @click="deleteItem(item)" small>
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
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
