import { UPDATE_CLASS_VALUE } from '../actions/types';

const initialState = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Sample Task title',
      description: 'Sample Task Description',
      comments: [
        {
          commentId: '1',
          user: {
            userId: 'nabin1234',
            userName: 'Nabin Bhusal',
            profilePic: 'www.google.com',
          },
          text: 'This is first comment',
          timestamp: 'july 2019',
        },
        {
          commentId: '2',
          user: {
            userId: 'nabin1234',
            userName: 'Nabin Bhusal',
            profilePic: 'www.google.com',
          },
          text: 'This is second comment',
          timestamp: 'Aug 2019',
        },
      ],
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'todo',
      taskIds: ['task-1'],
    },
  },
  columnOrder: ['column-1'],
  overLayContent: {
    isOpen: false,
    taskId: '',
    taskTitle: '',
    taskDescription: '',
    comments: [],
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
