import {Link} from "react-router-dom";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

const Nav = () => {

    const items = useStoreState( (state) => state.items);
    const search = useStoreState( (state) => state.search);
    const setSearch = useStoreActions( (actions) => actions.setSearch);
    const setSearchResults = useStoreActions( (actions) => actions.setSearchResults);

    
  useEffect(() => {
    const filteredResults = items.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [items, search]);
  


    return (
        <nav className="Nav">
            <form onSubmit={(e) => e.preventDefault()} className="searchForm">
                <label htmlFor="search">Search Posts</label>
                <input 
                    id="search"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}                
                />


            </form>

            <ul>
                <li><Link to="about">About</Link></li>
                <li><Link to="/" >Home</Link></li>
                <li><Link to="post">New Post</Link></li>
            </ul>

        </nav>
    )
}

export default Nav