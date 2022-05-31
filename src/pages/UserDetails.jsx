import React, { useEffect, useState } from 'react'
import Blockies from 'react-blockies'
import { useParams } from 'react-router-dom'
import { async } from 'regenerator-runtime'
import Post from '../components/Post'
import UserTile from '../components/UserTile'
import { logout } from '../utils'
import FollowDialog from './FollowDialog'

const UserDetails = () => {
    const [user, setUser] = useState([])
    const [following, setFollowing] = useState(false)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)
    const { account } = useParams()
    async function getData() {
        if (window.accountId == account) {
            window.history.replaceState({}, '', '/profile')
            window.history.go()
        }
        var user = await window.contract.getUser({
            accountId: account
        })
        var posts = await window.contract.getPostofUser({
            account: account
        })

        setPosts(posts)
        setUser(user)
        setLoading(false)
        setFollowing(user.follower.includes(window.accountId))
    }

    useEffect(() => {
        getData()
    }, [])

    async function handleFollow() {
        await window.contract.follow({
            account: account,
        })
        getData()
    }

    async function handleUnfollow() {
        await window.contract.unfollow({
            account: account,
        })
        getData()
    }

    if (loading) {
        return <div className='loading-overlay'>
            <div className="loader">Loading...</div>
        </div>
    }

    if (!user) {
        return <div className='main-section'>
            <div style={{ padding: '2rem' }}>
                <h1 style={{ color: 'white', }}>No User Found</h1>
                <h2 style={{ color: 'white', }}>Please check the account id</h2>
            </div>
        </div>
    }

    return (
        <div>
            <div className='profile-container'>
                <div className='profile-user-tile'>
                    <Blockies seed={user.account} className="blockies" size={25} />
                    <div style={{ display: 'flex', flex: 1, flexDirection: "column", gap: '10px 0' }}>
                        <div className='profile-user-name'>{user.name}</div>
                        <div className='profile-user-account'>{user.account}</div>
                    </div>
                    <div className='profile-logout' onClick={() => {
                        user?.follower.includes(window.accountId) ? handleUnfollow() : handleFollow()
                    }}>{following ? 'UnFollow' : 'Follow'}</div>
                </div>
                <p className='profile-user-desc'>{user.description}</p>
                <span style={{ display: 'flex', gap: '0 10px', color: 'white' }}><div className='follow-text' onClick={() => {setShowFollowers(true)}}>{`Followers ● ${user.follower?.length ?? 0}`}</div><div>○</div><div className='follow-text' onClick={() => {setShowFollowing(true)}}>{`Following ● ${user.following?.length ?? 0}`}</div></span>
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
                showFollowers && <FollowDialog users={user.follower} onHide={() => {setShowFollowers(false)}} title={'Followers'}/>
            }
            {
                showFollowing && <FollowDialog users={user.following} onHide={() => {setShowFollowing(false)}} title={'Following'}/>
            }
        </div>
    )
}

export default UserDetails