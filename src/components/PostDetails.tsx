import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../api/posts";
import { Typography, Button } from "@mui/material";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id ?? "", 10);
  const { data: post } = useGetPostByIdQuery(postId);

  return (
    <div>
      <Typography variant="h4">{post?.title}</Typography>
      <Typography variant="body1">{post?.body}</Typography>
      <Button component="a" href="/" variant="contained" color="primary">
        Back
      </Button>
    </div>
  );
};

export default PostDetails;
