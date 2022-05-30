import Big from 'big.js';
import React, { useEffect, useState } from 'react'
import Blockies from 'react-blockies';
import { FaComments } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import CommentTile from './CommentTile';


const Post = ({ post }) => {
    const [user, setUser] = useState(null)
    const [comment, setComment] = useState('')
    const [loading, setLoading] = React.useState(false)
    async function getData() {
        const user = await window.contract.getUser({ accountId: post.account })
        setUser(user)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await window.contract.createComment({
            id: Big(post.id).toString(),
            comment: comment
        })
        setComment('')
        setLoading(false)
    }

    const handleChange = (e) => {
        e.preventDefault()
        setComment(e.currentTarget.value)
    }
    useEffect(() => {
        getData()
    }, [])
    if (!user) {
        return <div />
    }

    return (
        <div className='post-container'>
            <Blockies seed={post.account} className="blockies" />
            <div className='post-details'>
                <div className='post-creator'>{user.name}<span style={{fontSize: '12px'}}>{`  ${user.username}`}</span></div>
                <img src={`https://${post.src.split("ipfs://")[1].split("/")[0]}.ipfs.nftstorage.link/${post.src.split("ipfs://")[1].split("/")[1]}`} className="post-image" />
                <div className='post-content'>{post?.post ?? 'Posting the Message'}</div>
                <div className='post-comment'>
                    <div className='post-comments-list'>
                        {post.comments.slice(-3).map((comment, i) => {
                            return (
                                <CommentTile comment={comment} key={i}/>
                            )
                        })}
                    </div>
                </div>

                <div className='divider' />
                <div className='action-section'>
                    <div className='comment-container'>
                        <input type={'text'} className="comment-input" value={comment} onChange={handleChange} onSubmit={handleSubmit} />
                        <FiSend onClick={handleSubmit} />
                    </div>
                    <div className='post-comments'>
                        <FaComments />
                        {post.comments.length}
                    </div>
                    <div className='see-more-button'>
                        <FaComments color='white' />
                        <div>See More Comments</div>
                    </div>
                </div>
            </div>
            {loading && <div className='loading-overlay'>
                <div className="loader">Loading...</div>
            </div>}
        </div>
    )
}

export default Post