import _ from 'lodash';

var taskQueue = []

const animateProgress = (type, updateNav) => {
  /* animates the progress bar in the the top of the navigation bar */
  if (type === 'start') {
    if (taskQueue.length === 0) {
      taskQueue.push(type);
      animator(type, updateNav);
    }
  } else {
    taskQueue.push(type);
    if (taskQueue.length === 1) {
      animator(type, updateNav);
    }
  }
}

const animator = (type, updateNav) => {
// type will be as start and end
  if (type === 'start') {
    let incr = 0;
    var interval = setInterval(function() {
      updateNav({ schema: 'progress', data: { percent: incr }});
      if (incr === 50) {
        clearInterval(interval);
        taskQueue.splice(0, 1);
        if (taskQueue.length > 0) {
          animator('end', updateNav)
        }
      }
      incr += 1;
    }, 10);
  } else {
    let incr = 50;
    var interval = setInterval(function() {
      updateNav({ schema: 'progress', data: { percent: incr }});
      if (incr === 100) {
        clearInterval(interval);
        updateNav({ schema: 'progress', data: { percent: 0 }});
        taskQueue = [];
      }
      incr += 1;
    }, 10);
  }
}

export default animateProgress;
