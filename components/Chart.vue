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
  data () {
    return {
      chartObject: null
    }
  },
  mounted () {
    // eslint-disable-next-line
    const ctx = document.getElementById('monteCarloChart').getContext('2d')
    // eslint-disable-next-line
    this.chartObject = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(this.buckets()),
        datasets: [{
          data: this.chartData(),
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

    const self = this
    this.$store.subscribe((mutation, state) => {
      if (['tasks/updateLow', 'tasks/updateTarget', 'tasks/updateHigh'].includes(mutation.type) !== -1) {
        self.debounceUpdate()
      }
    })
  },
  methods: {
    debounceUpdate () {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer)
      }
      const self = this
      this.debounceTimer = setTimeout(function () {
        // should check if values are valid
        self.chartObject.data.labels = Object.keys(self.buckets())
        self.chartObject.data.datasets[0].data = self.chartData()
        self.chartObject.update()
      }, 400)
    },
    chartData () {
      const points = []
      const self = this
      Object.keys(this.buckets()).forEach(function (bucketNumber) {
        points.push({
          x: parseInt(bucketNumber),
          y: self.buckets()[bucketNumber]
        })
      })
      return points
    },
    bucketSize () {
      const min = Math.min(...this.samples())
      const max = Math.max(...this.samples())
      const diff = max - min
      const bucketSize = diff / 10 // 10 is the preferred amount of buckets
      return bucketSize >= 40 ? 40 : bucketSize >= 8 ? 8 : 1
    },
    buckets () {
      const buckets = {}
      const bucketSize = this.bucketSize()
      this.samples().forEach(function (sample) {
        const bucketNumber = Math.round(sample / bucketSize) * bucketSize
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
          let score = 0

          if (task.target !== '') {
            score = this.applyTargetAsDistributionTop(task, random)
          } else {
            score = (task.high - task.low) * random + task.low
          }

          sum += score
        })

        samples.push(sum)
      }
      return samples
    },
    applyTargetAsDistributionTop (task, random) {
      let score
      if (random < 0.5) {
        score = (random * 2) * (task.target - task.low)
        score += task.low
      } else {
        score = ((random % 0.5) * 2) * (task.high - task.target)
        score += task.target
      }
      return score
    }
  }
}
</script>
