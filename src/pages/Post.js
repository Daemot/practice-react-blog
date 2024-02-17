import { Link } from "react-router-dom";

const Post = ({ item }) => {
  return (
    <article className="post">
      <Link to={`post/${item.id}`}>
        <p className="postTitle">{item.title}</p>
        <p className="postDateTime">{item.datetime}</p>
      </Link>
      <p className="postBody">{item.body}</p>
    </article>
  );
};
export default Post;
