<template>
  <tr>
    <td>
      <v-text-field
        v-model="name"
        placeholder="Task name"
      />
    </td>
    <td>
      <v-text-field v-model="low" class="number" />
    </td>
    <td>
      <v-text-field v-model="target" class="number" />
    </td>
    <td>
      <v-text-field v-model="high" class="number" />
    </td>
    <td>
      <v-icon @click="deleteItem()" small>
        mdi-delete
      </v-icon>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'Task',
  props: {
    'task': Object
  },
  computed: {
    name: {
      get () {
        return this.task.name
      },
      set (value) {
        const payload = { task: this.task, name: value }
        this.$store.commit('tasks/updateName', payload)
      }
    },
    low: {
      get () {
        return this.task.low
      },
      set (value) {
        const payload = { task: this.task, low: value }
        this.$store.commit('tasks/updateLow', payload)
      }
    },
    target: {
      get () {
        return this.task.target
      },
      set (value) {
        const payload = { task: this.task, target: value }
        this.$store.commit('tasks/updateTarget', payload)
      }
    },
    high: {
      get () {
        return this.task.high
      },
      set (value) {
        const payload = { task: this.task, high: value }
        this.$store.commit('tasks/updateHigh', payload)
      }
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
