import React, { useEffect } from 'react';
import { PageHeader, Button } from 'antd';

import { usePosts } from './use-posts';
import { PostCard } from './components/post-card';
import { useAuth } from '../AuthProvider/use-auth';
import { useRouter } from '../../utils/router/use-router';

import './styles.css';

export const PostList = () => {
  const posts = usePosts();
  const router = useRouter();
  const auth = useAuth();

  const navigateToCreatePost = () => router.push('/create-post');

  const getPageHeaderExtras = () => {
    const { payload } = auth.user;

    return (
      payload && [
        <Button key="1" onClick={navigateToCreatePost}>
          Create post
        </Button>,
      ]
    );
  };

  useEffect(() => {
    posts.getPosts();
  }, []);

  const { payload, loading } = posts.list;

  return (
    <section>
      <PageHeader title="Posts list" extra={getPageHeaderExtras()} />
      <div className="posts">
        {payload.map(post => (
          // eslint-disable-next-line
          <PostCard loading={loading} post={post} key={post._id} />
        ))}
      </div>
    </section>
  );
};
