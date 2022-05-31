import React, { useEffect, useState } from 'react'
import Blockies from 'react-blockies'
import Post from '../components/Post'
import { logout } from '../utils'
import FollowDialog from './FollowDialog'

const Profile = () => {
    const [user, setUser] = useState([])
    const [posts, setPosts] = useState([])
    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)
    async function getData() {
        var user = await window.contract.getUser({
            accountId: window.accountId
        })

        var posts = await window.contract.getPostofUser({
            account: window.accountId
        })
        setPosts(posts)
        setUser(user)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>

            <div className='profile-container'>
                <div className='profile-user-tile'>
                    <Blockies seed={window.accountId} className="blockies" size={25} />
                    <div style={{ display: 'flex', flex: 1, flexDirection: "column", gap: '10px 0' }}>
                        <div className='profile-user-name'>{user.name}</div>
                        <div className='profile-user-account'>{user.account}</div>
                    </div>
                    <div className='profile-logout' onClick={logout}>Logout</div>
                </div>
                <p className='profile-user-desc'>{user.description}</p>
                <span style={{ display: 'flex', gap: '0 10px', color: 'white' }}><div className='follow-text' onClick={() => { setShowFollowers(true) }}>{`Followers ● ${user.follower?.length ?? 0}`}</div><div>○</div><div className='follow-text' onClick={() => { setShowFollowing(true) }}>{`Following ● ${user.following?.length ?? 0}`}</div></span>
            </div>
            <div className='divider' />
            <div className='main-section'>
                <div className='post-section'>
                    {
                        posts.map((e, i) => {
                            return <Post key={i} post={e} />
                        })
                    }
                </div>
                <div className='followers-section'>
                    {
                        user.follower?.map((e, i) => {
                            return <UserTile user={e} key={i} />
                        })
                    }
                </div>

            </div>
            {
                showFollowers && <FollowDialog users={user.follower} onHide={() => { setShowFollowers(false) }} title={'Followers'} />
            }
            {
                showFollowing && <FollowDialog users={user.following} onHide={() => { setShowFollowing(false) }} title={'Following'} />
            }
        </div>
    )
}

export default Profile