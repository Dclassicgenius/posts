import React from "react";
import { useGetPostsQuery } from "../api/posts";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const MainPage = () => {
  const { data: posts, isLoading, isError } = useGetPostsQuery();

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const post = posts?.[index];

    if (!post) return null;

    return (
      <div style={style}>
        <Box p={1}>
          <Typography variant="h6">{post.id}</Typography>
          <Typography variant="h5">{post.title}</Typography>
          <Typography variant="body1" noWrap>
            {post.body.length > 100
              ? `${post.body.slice(0, 100)}...`
              : post.body}
          </Typography>
          <Button
            component={Link}
            to={`/post/${post.id}`}
            variant="contained"
            color="primary"
            size="small"
            sx={{ mb: 1 }}
          >
            View
          </Button>
        </Box>
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching posts.</div>;
  }

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      {
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={posts?.length || 0}
              itemSize={100}
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      }
    </div>
  );
};

export default MainPage;
