import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Alert, Row, Col } from 'antd';

import { usePosts } from '../PostList/use-posts';
import { useRouter } from '../../utils/router/use-router';

const CreatePost = ({ form }) => {
  const [error, setError] = useState();
  const posts = usePosts();
  const router = useRouter();

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        posts.createPost(values)
          .then(() => router.push('/'))
          .catch(err => setError(err));
      }
    });
  };

  return (
    <Row>
      <Col span={12} offset={6}>
        <h2>Create new post</h2>
        <Form onSubmit={handleSubmit}>
          {error && (
            <Form.Item>
              <Alert
                message="Validation error"
                type="error"
                description={error}
              />
            </Form.Item>
          )}
          <Form.Item>
            {form.getFieldDecorator('title', {
              rules: [
                { required: true, message: 'Please input post title!' },
                { max: 255, message: 'Title max symbols 255' },
              ],
            })(
              <Input placeholder="Post title" />,
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('article', {
              rules: [{ required: true, message: 'Please input your article!' }],
            })(
              <Input.TextArea
                rows={4}
                placeholder="Post"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('postCover')(
              <Input placeholder="Image url" />,
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('description')(
              <Input placeholder="Post description"/>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Post
            </Button>
          </Form.Item>
        </Form>

    </Col>
    </Row>
  );
};

export const CreatePostForm = Form.create({ name: 'post_form' })(CreatePost);

CreatePost.propTypes = {
  form: PropTypes.object.isRequired,
};
