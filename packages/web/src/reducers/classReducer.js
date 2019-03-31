import { UPDATE_CLASS_VALUE } from '../actions/types';

const initialState = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Wash clothes' },
    'task-3': { id: 'task-3', content: 'Cook your food' },
    'task-4': { id: 'task-4', content: 'Do proper class in a proper way' },
    'task-5': { id: 'task-5', content: 'Deadline is coming' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'todo',
      taskIds: ['task-1', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Progress',
      taskIds: ['task-2', 'task-3'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-5'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
  overLayContent: {
    isOpen: false,
    taskId: '',
    taskContent: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CLASS_VALUE:
      return {
        ...state,
        [action.payload.schema]: action.payload.data,
      };
    default:
      return state;
  }
};
