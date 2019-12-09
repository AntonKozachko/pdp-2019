import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { Card, Button, Tooltip, Icon, notification } from 'antd';
import { useAuth } from '../../AuthProvider/use-auth';
import { usePosts } from '../use-posts';

import './style.css';

const { Meta } = Card;

PostCard.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    postCover: PropTypes.string,
    id: PropTypes.string,
    created: PropTypes.string,
    likes: PropTypes.shape({
      count: PropTypes.number,
      voted: PropTypes.bool,
    }),
  }),
  loading: PropTypes.bool,
  reloadPosts: PropTypes.func.isRequired,
};

PostCard.defaultProps = {
  loading: false,
};

export function PostCard({ post, loading, reloadPosts }) {
  const { id, description, title, postCover, created, likes, author } = post;
  const posts = usePosts();
  const auth = useAuth();

  const getCover = () => (
    <img className="post-cover" height="270" alt="post_cover" src={postCover} />
  );

  const showNotification = ({ message, type }) => {
    notification[type]({
      description: message,
    });
  };

  const likePost = async () => {
    try {
      await posts.likePost(id);
      reloadPosts();
    } catch (err) {
      showNotification({
        type: 'warning',
        message: err,
      });
    }
  };

  const removePost = async () => {
    try {
      await posts.deletePost(id);
      showNotification({
        type: 'success',
        message: 'Post successfully removed',
      });
      reloadPosts();
    } catch (err) {
      showNotification({
        type: 'error',
        message: err,
      });
    }
  };

  const likeButton = () => {
    const { voted, count } = likes;
    const theme = voted ? 'filled' : 'outlined';
    const tooltipTitle = voted
      ? `You and ${count - 1} other`
      : `Liked by ${count} users`;

    return (
      <Tooltip key="like_button" title={tooltipTitle}>
        <Button shape="circle" onClick={likePost}>
          <Icon type="heart" theme={theme} style={{ color: 'red' }} />
        </Button>
      </Tooltip>
    );
  };

  const removeButton = () => {
    const { id: authorId } = author;

    const userId = get(auth.user, 'payload.id', '');

    const isUserPost = authorId === userId;

    return (
      isUserPost && (
        <Button key="delete_button" shape="circle" onClick={removePost}>
          <Icon type="delete" />
        </Button>
      )
    );
  };

  const createdDate = new Date(created).toLocaleDateString();

  return (
    <Card
      hoverable
      extra={createdDate}
      style={{ width: '20%', margin: '20px' }}
      cover={getCover()}
      loading={loading}
      title={title}
      actions={[removeButton(), likeButton()]}
    >
      <Meta title={description} description={`by ${author.name}`} />
    </Card>
  );
}
