import React, { useEffect } from 'react'
import Post from '../components/Post'
import UserTile from '../components/UserTile'
import { logout } from '../utils'

const HomePage = ({ postEdit }) => {
    const [posts, setPosts] = React.useState([])
    const [users, setUsers] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    async function getData() {
        setLoading(true)
        var posts = await window.contract.getPosts()
        var users = await window.contract.getUsers()
        if (posts) {
            setPosts(posts)
        }
        if (users) {
            setUsers(users)
        }
        setLoading(false)
    }

    useEffect(() => {
        getData()
    }, [postEdit])

    useEffect(() => {
        if (!window.walletConnection.isSignedIn()) {
            window.history.pushState({}, '', '/login')
            window.history.go()
        }
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
                {
                    posts.map((e, i) => {
                        return <Post key={i} post={e} onChange={getData} />
                    })
                }
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

export default HomePage