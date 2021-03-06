import React, { useState } from 'react';
import useStyles from './styles';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import memories from '../../../images/memories.png';
import { deletePost, likePost } from '../../../actions/posts';
import { useHistory } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile')) || null;

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  const userId = user?.result?.googleId || user?.result?._id;

  const handleClick = () => {
    dispatch(deletePost(post._id));
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile || memories}
          title={post.title}
        />

        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>

        {user &&
          (user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <div className={classes.overlay2}>
              <Button
                style={{ color: 'white' }}
                size="small"
                onClick={() => setCurrentId(post._id)}
              >
                <MoreHorizIcon fontSize="medium" />
              </Button>
            </div>
          )}

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags?.map((tag) => ` #${tag}`)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5">
          {' '}
          {post.title}
        </Typography>

        <CardContent>
          <Typography
            className={classes.message}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {' '}
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>

      {user && (
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(likePost(post._id));
            }}
          >
            <ThumbUpAltIcon fontSize="small" />
            &nbsp; Like &nbsp;
            {post?.likes.length}
          </Button>

          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Button size="small" color="primary" onClick={handleClick}>
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default Post;
