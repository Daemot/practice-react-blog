import { createStore, action, thunk, computed } from "easy-peasy";
import api from "./api/posts";

export default createStore({
    items: [],
    setItems: action((state, payload) => {
        state.items = payload;
    }),
    postBody: "",
    setPostBody: action((state, payload) => {
        state.postBody = payload;
    }),
    postTitle: "",
    setPostTitle: action((state, payload) => {
        state.postTitle = payload;
    }),
    editBody: "",
    setEditBody: action((state, payload) => {
        state.editBody = payload;
    }),
    editTitle: "",
    setEditTitle: action((state, payload) => {
        state.editTitle = payload;
    }),
    search: "",
    setSearch: action((state, payload) => {
        state.search = payload;
    }),
    searchResults: [],
    setSearchResults: action((state, payload) => {
        state.searchResults = payload;
    }),
    postCount: computed((state) => state.items.length ), 

    getPostById: computed( (state) => {
        return (id) => state.items.find(post => (post.id).toString() === id )
    }),
    savePost: thunk( async (actions, newPost, helpers) => {
        const {items} = helpers.getState();

        try {
            const response = await api.post("/posts", newPost);
            actions.setItems([...items, response.data]);
            actions.setPostTitle("");
            actions.setPostBody("");
          } catch (err) {
            if (err.response) {
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
            } else console.log(`Error: ${err.message}`);
        }
    }),

    deletePost: thunk( async (actions, id, helpers) => {
        const {items} = helpers.getState();
        try {
            api.delete(`/posts/${id}`);
            actions.setItems(items.filter((post) => post.id !== id));
          } catch (err) {
            console.log(`Error: ${err.message}`);
          }
    }), 

    editPost: thunk( async (actions, updatedPost, helpers) => {
        const {items} = helpers.getState();
        const {id} = updatedPost;

        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            actions.setItems(items.map((post) => (post.id === id ? response.data : post)));
            actions.setEditBody("");
            actions.setEditTitle("");
          } catch (err) {
            console.log(`Error: ${err.message}`);
          }

    })
});