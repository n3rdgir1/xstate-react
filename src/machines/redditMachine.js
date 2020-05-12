import { Machine, assign } from 'xstate';
import invokeFetchedSubreddit from './fetchSubreddit';

export const SELECT = 'SELECT';

export const redditMachine = Machine({
  id: 'reddit',
  initial: 'idle',
  context: {
    subreddit: null, // none selected
  },
  states: {
    idle: {},
    selected: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            id: 'fetch-subreddit',
            src: invokeFetchedSubreddit,
            onDone: {
              target: 'loaded',
              actions: assign({
                posts: (_, event) => event.data
              }),
            },
            onError: {
              target: 'failed',
              actions: assign({
                error: (_, event) => event.data
              }),
            },
          },
        },
        loaded: {},
        failed: {},
      },
    },
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
