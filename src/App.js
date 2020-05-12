import React from 'react';
import { useMachine } from '@xstate/react';
import { redditMachine } from './machines/redditMachine';
import './App.css';
import Subreddit from './Subreddit';

const subreddits = ['frontend', 'reactjs', 'vuejs', 'oaiewhtoeaiht'];

const App = () => {
  const [current, send] = useMachine(redditMachine);
  const { subreddit } = current.context;

  return (
    <main>
      <header>
        <div className="select">
          <select
            onChange={e => {
              send('SELECT', { name: e.target.value });
            }}
          >
            {subreddits.map(subreddit => {
              return <option key={subreddit}>{subreddit}</option>;
            })}
          </select>
        </div>
      </header>
      <section>
        {current.matches('idle') && <h1>Select a subreddit</h1>}
        {subreddit && <Subreddit service={subreddit} key={subreddit.id} />}
      </section>
    </main>
  );
};
export default App;
