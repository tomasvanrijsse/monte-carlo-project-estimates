export const state = () => ({
  list: [{
    name: 'Task 1',
    low: 1,
    target: 4,
    high: 10
  }]
})

export const mutations = {
  add (state, location) {
    const emptyTask = {
      name: '',
      low: null,
      target: null,
      high: null
    }

    if (location === 'top') {
      state.list.unshift(emptyTask)
    } else {
      state.list.push(emptyTask)
    }
  },
  remove (state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  updateName (state, { task, name }) {
    task.name = name
  },
  updateLow (state, { task, low }) {
    task.low = low
  },
  updateTarget (state, { task, target }) {
    task.target = target
  },
  updateHigh (state, { task, high }) {
    task.high = high
  }
}
