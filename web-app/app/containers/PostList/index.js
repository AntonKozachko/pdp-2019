import React, { useEffect } from 'react';

import { usePosts } from './use-posts';
import { PostCard } from './components/post-card';

import './styles.css';

export const PostList = () => {
  const posts = usePosts();

  useEffect(() => {
    posts.getPosts();
  }, []);

  const { payload, loading } = posts.list;

  return (
    <section>
      <h3>Posts list</h3>
      <div className="posts">
        {payload.map(post => (
          // eslint-disable-next-line
          <PostCard loading={loading} post={post} key={post._id} />
        ))}
      </div>
    </section>
  );
};
