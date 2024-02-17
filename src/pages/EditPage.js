import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";


const EditPage = () => {
  const { id } = useParams();

  const editBody = useStoreState( (state) => state.editBody);
  const setEditBody = useStoreActions( (actions) => actions.setEditBody);
  const editTitle = useStoreState( (state) => state.editTitle);
  const setEditTitle = useStoreActions( (actions) => actions.setEditTitle);
  const getPostById = useStoreState( (state) => state.getPostById);

  const editPost = useStoreActions( (actions) => actions.editPost);
  const navigate = useNavigate();
  
  const post = getPostById(id);


  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
     // eslint-disable-next-line
  }, []);

  const handleEdit = (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
      const updatedPost = { id, title: editTitle, datetime, body: editBody };
      editPost(updatedPost);

      navigate(`/post/${updatedPost.id}`);
  };

  return (
    <main className="CreatePost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>

          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="title">Title:</label>
            <input
              required
              id="title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <label htmlFor="body">Body: </label>
            <textarea
              id="body"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />

            <button type="button" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPage;
