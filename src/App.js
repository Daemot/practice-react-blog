import Layout from "./pages/Layout";
import About from "./pages/About";
import Home from "./pages/Home";
import Missing from "./pages/Missing";
import CreatePost from "./pages/CreatePost";
import ViewPosts from "./pages/ViewPosts";
import EditPage from "./pages/EditPage";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreActions } from "easy-peasy";

function App() {
  const setItems = useStoreActions((actions) => actions.setItems);
  
  const data = [];
  const fetchError = null;
  const isLoading = false;

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<Home isLoading={isLoading} fetchError={fetchError} />}
        />
        <Route path="Post">
          <Route index element={<CreatePost />} />
          <Route path=":id" element={<ViewPosts />} />
        </Route>
        <Route path="edit/:id" element={<EditPage />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
