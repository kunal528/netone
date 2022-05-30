import React, { useEffect } from 'react'
import Post from '../components/Post'
import UserTile from '../components/UserTile'
import { logout } from '../utils'

const HomePage = () => {
    const [posts, setPosts] = React.useState([])
    const [users, setUsers] = React.useState([])

    async function getData() {
        var posts = await window.contract.getPosts()
        var users = await window.contract.getUsers()
        if (posts) {
            setPosts(posts)
        }
        if (users) {
            setUsers(users)
        }
    }

    useEffect(() => {
        if (!window.walletConnection.isSignedIn()) {
            window.history.pushState({}, '', '/login')
            window.history.go()
        }
        getData()
    }, [])
    return (
        <div className='main-section'>
            <div className='view-section'>
                {
                    posts.map((e, i) => {
                        return <Post key={i} post={e} />
                    })
                }
            </div>
            <div className='sidebar-section'>
                <div className='following-section'>
                    <input type={'text'} className="search-input" placeholder='Search' />
                    {
                        users.map((e, i) => {
                            return <UserTile user={e} key={i} />
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default HomePage