import Post from "./Post"

const Feed = ({items}) => {
    return (

        items.map( (item) => {
            return (<Post key={item.id} item={item} /> )
        })
    )
}
    



export default Feed