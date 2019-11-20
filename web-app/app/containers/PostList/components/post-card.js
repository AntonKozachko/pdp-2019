import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { Card, Button, Tooltip, Icon } from 'antd';

import { useAuth } from '../../AuthProvider/use-auth';

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
      voters: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  loading: PropTypes.bool,
};

PostCard.defaultProps = {
  loading: false,
};

export function PostCard({ post, loading }) {
  const { description, title, postCover, created, likes, author } = post;
  const auth = useAuth();

  const getCover = () => <img alt="post_cover" src={postCover} />;

  const likeButton = () => {
    const userId = get(auth, 'user.payload.id');
    const isLiked = likes.voters.includes(userId);

    const theme = isLiked ? 'filled' : 'outlined';
    const tooltipTitle = isLiked
      ? `You and ${likes.count - 1} other`
      : `Liked by ${likes.count} users`;

    return (
      <Tooltip title={tooltipTitle}>
        <Button shape="circle">
          <Icon type="heart" theme={theme} style={{ color: 'red' }} />
        </Button>
      </Tooltip>
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
      actions={[likeButton()]}
    >
      <Meta title={description} description={`by ${author.name}`} />
    </Card>
  );
}
