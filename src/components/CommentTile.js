import React from 'react'
import Blockies from 'react-blockies'
import { Link } from 'react-router-dom'

const CommentTile = ({ comment }) => {
    const [user, setUser] = React.useState(null)
    async function getData() {
        const user = await window.contract.getUser({ accountId: comment.account })
        setUser(user)
    }

    React.useEffect(() => {
        getData()
    }, [])
    return (
        <div className='comment-tile'>
            <Blockies seed={comment.account} className="blockies" size={6} />
            <div>
                <Link to={`/user/${user?.account}`} style={{textDecoration: 'none'}}><div className='comment-creator'>{user?.name ?? ''}</div></Link>
                <div className='comment-content'>{`⤷ ${comment.comment}`}</div>
            </div>
        </div>
    )
}

export default CommentTile