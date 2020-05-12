import { interpret } from 'xstate';

import {redditMachine, SELECT} from './redditMachine';

jest.mock('./fetchSubreddit', () => 
  ({subreddit}) => {
    if(subreddit === 'reactjs') {
      return Promise.resolve(['post1', 'post2']);
    } else {
      return Promise.reject('some message');
    }
  }
);

describe('reddit machine', () => {
  it('should load posts of a selected subreddit', done => {
    const redditService = interpret(redditMachine)
      .onTransition(state => {
        if (state.matches({selected: 'loaded'})) {
          expect(state.context.posts).toEqual(['post1', 'post2']);
          done();
        }
      })
      .start();

      redditService.send(SELECT, { name: 'reactjs' })
  });

  it('should have error on unknown subreddit', done => {
    const redditService = interpret(redditMachine)
      .onTransition(state => {
        if (state.matches({selected: 'failed'})) {
          expect(state.context.error).toEqual('some message');
          done();
        }
      })
      .start();

      redditService.send(SELECT, { name: 'something else' })
  });
});