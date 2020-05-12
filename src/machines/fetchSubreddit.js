
const invokeFetchedSubreddit = ({subreddit}) => {
  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .then(json => json.data.children.map(child => child.data));
};

export default invokeFetchedSubreddit;