import { Machine, assign } from 'xstate';

export const SELECT = 'SELECT';

export const redditMachine = Machine({
  id: 'reddit',
  initial: 'idle',
  context: {
    subreddit: null, // none selected
  },
  states: {
    idle: {},
    selected: {},
  },
  on: {
    [SELECT]: {
      target: '.selected',
      actions: assign({
        subreddit: (_, event) => event.name
      }),
    },
  },
});
