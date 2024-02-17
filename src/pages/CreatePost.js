import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

const CreatePost = () => {

  const postTitle = useStoreState( (state) => state.postTitle);
  const postBody = useStoreState( (state) => state.postBody);
  const items = useStoreState( (state) => state.items);

  const setPostBody = useStoreActions( (actions) => actions.setPostBody);
  const setPostTitle = useStoreActions( (actions) => actions.setPostTitle);
  const savePost = useStoreActions( (actions) => actions.savePost);

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };


    savePost(newPost);
    navigate("/");
 
  };
  return (
    <main className="CreatePost">
      <h2>New Post</h2>

      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          required
          id="title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />

        <label htmlFor="body">Body: </label>
        <textarea
          id="body"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default CreatePost;
