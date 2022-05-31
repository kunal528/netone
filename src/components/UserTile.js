import React from 'react'
import Blockies from 'react-blockies'
import { Link } from 'react-router-dom'

const UserTile = ({ user }) => {
    const [data, setData] = React.useState(null)
    async function getData() {
        console.log(user)
        let _user = await window.contract.getUser({ accountId: user })
        setData(_user)
    }

    React.useEffect(() => {
        if (typeof user === 'string') {
            getData()
        }
        else {
            setData(user)
        }
    }, [])


    if (!data) {
        return <div />
    }
    return (
        <Link to={`/user/${data.account}`} style={{ textDecoration: 'none' }}>
            <div className='user-tile'>
                <Blockies seed={data.account} className="blockies" />
                <div>
                    <div className='user-name'>{data.name}</div>
                    <div className='user-account'>{data.username}</div>
                </div>
            </div>
        </Link>
    )
}

export default UserTile