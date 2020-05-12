import React, { useMemo } from 'react';
import { useMachine } from '@xstate/react';
import { createSubredditMachine } from './machines/subredditMachine';

const Subreddit = ({ name }) => {
  // Only create the machine based on the subreddit name once
  const subredditMachine = useMemo(() => {
    return createSubredditMachine(name);
  }, [name]);

  const [current, send] = useMachine(subredditMachine);

  if (current.matches('failure')) {
    return (
      <div>
        Failed to load posts.{' '}
        <button onClick={_ => send('RETRY')}>Retry?</button>
      </div>
    );
  }

  const { subreddit, posts, lastUpdated } = current.context;

  return (
    <section
      data-machine={subredditMachine.id}
      data-state={current.toStrings().join(' ')}
    >
      <>
        <header>
          <h2>{subreddit}</h2>
          {lastUpdated && <small>
            Last updated: {lastUpdated}{' '}
            <button onClick={_ => send('REFRESH')}>Refresh</button>
          </small>}
        </header>
        {current.matches('loading') && <div>Loading posts...</div>}
        {posts && (
            <ul>
              {posts.map(post => {
                return <li key={post.id}>{post.title}</li>;
              })}
            </ul>
        )}
      </>
    </section>
  );
};

export default Subreddit;