import React from 'react'
import { MdClose } from 'react-icons/md'
import { NFTStorage } from 'nft.storage'
import Big from 'big.js'

const storage = new NFTStorage({
    token: process.env.REACT_APP_API_KEY
})



const CreatePost = ({ onPost, onHide }) => {

    const [title, setTitle] = React.useState('')
    const [file, setFile] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        var ipfsData = await storage.store({
            name: title,
            description: '',
            image: file
        })
        await window.contract.createPost({
            post: title,
            src: ipfsData.data.image.href,
            timestamp: Big(Date.now()).toFixed()
        })
        onPost()
        onHide()
    }

    const handleTitle = (e) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <div className='dialog-overlay'>
            <div className='dialog'>
                <div className='dialog-title-section'>
                    <div className='dialog-title'>Create Post</div>
                    <MdClose onClick={onHide} style={{ cursor: 'pointer' }} />
                </div>
                <textarea className='create-input' value={title} onChange={handleTitle} />
                <input type={'file'} className="create-file-input" onChange={(e) => {
                    setFile(e.currentTarget.files[0])
                }} />
                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                    <div className='create-button' onClick={onSubmit}>Create</div>
                </div>
            </div>
            {loading && <div className='loading-overlay'>
                <div className="loader">Loading...</div>
            </div>}
        </div>
    )
}

export default CreatePost