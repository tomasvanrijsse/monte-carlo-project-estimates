export const state = () => ({
  list: [{
    name: 'Task 1',
    low: 1,
    target: 4,
    high: 10,
    lowHasError: false,
    highHasError: false
  }]
})

export const mutations = {
  add (state, location) {
    const emptyTask = {
      name: '',
      low: null,
      target: null,
      high: null,
      lowHasError: false,
      highHasError: false
    }

    if (location === 'top') {
      state.list.unshift(emptyTask)
    } else {
      state.list.push(emptyTask)
    }
  },
  remove (state, { task }) {
    state.list.splice(state.list.indexOf(task), 1)
  },
  updateName (state, { task, name }) {
    task.name = name
  },
  updateLow (state, { task, low }) {
    task.low = low
    task.lowHasError = !(task.target === '' || task.low < task.target)
  },
  updateTarget (state, { task, target }) {
    task.target = target
    task.lowHasError = !(task.target === '' || task.low < task.target)
    task.highHasError = !(task.target === '' || task.high > task.target)
  },
  updateHigh (state, { task, high }) {
    task.high = high
    task.highHasError = !(task.target === '' || task.high > task.target)
  }
}
