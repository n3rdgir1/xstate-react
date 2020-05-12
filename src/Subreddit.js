import React from 'react';
import { useService } from '@xstate/react';

const Subreddit = ({ service }) => {
  const [current, send] = useService(service)
  const { subreddit, posts, lastUpdated } = current.context;

  if (current.matches('failure')) {
    return (
      <div>
        <h2>{subreddit}</h2>
        Failed to load posts.{' '}
        <button onClick={_ => send('RETRY')}>Retry?</button>
      </div>
    );
  }


  return (
    <section
      data-machine={service.id}
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