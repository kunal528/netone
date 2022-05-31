import React from 'react'
import { useParams } from 'react-router-dom'
import Post from '../components/Post'
import UserTile from '../components/UserTile'

const PostDetail = () => {
    const { postId } = useParams()
    const [post, setPost] = React.useState(null)
    const [users, setUsers] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    async function getData() {
        var post = await window.contract.getPost({
            id: postId
        })

        var users = await window.contract.getUsers()
        if (users) {
            setUsers(users)
        }
        if (post) {
            setPost(post)
        }
        setLoading(false)
    }


    React.useEffect(() => {
        getData()
    }, [])
    if (loading) {
        return <div className='loading-overlay'>
            <div className="loader">Loading...</div>
        </div>
    }

    return (
        <div className='main-section'>
            <div className='view-section'>
                {post ? <Post key={0} post={post} onChange={getData} /> : <h1 style={{ color: 'white', padding: '1rem' }}>Post Not Found</h1>}
            </div>
            <div className='sidebar-section'>
                <div className='following-section'>
                    <input type={'text'} className="search-input" placeholder='Search' />
                    {
                        users.slice(0, 10).map((e, i) => {
                            return <UserTile user={e} key={i} />
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default PostDetail