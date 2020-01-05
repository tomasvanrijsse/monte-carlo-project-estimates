<template>
  <div>
    Chart
  </div>
</template>

<script>
const d3 = require('d3-random')

export default {
  name: 'Chart',
  computed: {
    chartData () {
      const tasks = this.$store.state.tasks.list

      const samples = []

      for (let i = 0; i < 1000; i++) {
        let sum = 0

        tasks.forEach(function (task, index) {
          const random = d3.randomNormal(0.5, 0.15)()
          let value = 0

          if (random < 0.5) {
            value = (random * 2) * (task.target - task.low)
          } else {
            value = (task.target - task.low)
            value += ((random % 0.5) * 2) * (task.high - task.target)
          }

          const score = task.low + value
          sum += score
        })

        samples.push(sum)
      }
      return samples
    }
  }
}
</script>
