<template>
  <div>
    <canvas id="monteCarloChart" />
  </div>
</template>

<script>
const d3 = require('d3-random')
const Chart = require('chart.js')

export default {
  name: 'Chart',
  mounted () {
    // eslint-disable-next-line
    const ctx = document.getElementById('monteCarloChart').getContext('2d')
    // eslint-disable-next-line
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(this.buckets),
        datasets: [{
          data: this.chartData,
          borderColor: [
            'rgba(255, 255, 255, 0.7)'
          ],
          backgroundColor: [
            'rgba(255, 255, 255, 0.1)'
          ]
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Probability'
            },
            ticks: {
              // Include a dollar sign in the ticks
              callback (value, index, values) {
                return value / 10 + '%'
              }
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Hours needed'
            }
          }]
        }
      }
    })
  },
  computed: {
    chartData () {
      const points = []
      const self = this
      Object.keys(this.buckets).forEach(function (bucketNumber) {
        points.push({
          x: parseInt(bucketNumber),
          y: self.buckets[bucketNumber]
        })
      })
      return points
    },
    buckets () {
      // i'll asume for now that tasks are estimated in hours
      const buckets = {}
      this.samples.forEach(function (sample) {
        const bucketNumber = Math.ceil(sample / 1) * 1
        if (buckets[bucketNumber] === undefined) {
          buckets[bucketNumber] = 0
        }
        buckets[bucketNumber]++
      })

      return buckets
    },
    samples () {
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
