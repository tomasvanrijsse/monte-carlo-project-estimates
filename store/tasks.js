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

const validate = {
  low (low, target) {
    if (isNaN(low) || low === '') {
      return false
    }
    return (target === '' || (low < target))
  },
  high (high, target) {
    if (isNaN(high) || high === '') {
      return false
    }
    return (target === '' || (high > target))
  }
}

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
    if (!isNaN(low)) {
      task.low = low === '' ? '' : parseInt(low)
    }
    task.lowHasError = !validate.low(low, task.target)
  },
  updateTarget (state, { task, target }) {
    if (!isNaN(target)) {
      task.target = target === '' ? '' : parseInt(target)
    }
    task.lowHasError = !validate.low(task.low, target)
    task.highHasError = !validate.high(task.high, target)
  },
  updateHigh (state, { task, high }) {
    if (!isNaN(high)) {
      task.high = high === '' ? '' : parseInt(high)
    }
    task.highHasError = !validate.high(high, task.target)
  }
}
