import React from 'react'
import { MdClose } from 'react-icons/md'
import CommentTile from '../components/CommentTile'

const SeeComments = ({ post, onHide }) => {
    return (
        <div className='dialog-overlay'>
            <div className='dialog'>
                <div className='dialog-title-section'>
                    <div className='dialog-title'>See Comments</div>
                    <MdClose onClick={onHide} style={{ cursor: 'pointer' }} />
                </div>
                <div className='post-comment-content'>
                    {
                        post.comments.map((comment, index) => {
                            return <CommentTile comment={comment} key={index} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SeeComments