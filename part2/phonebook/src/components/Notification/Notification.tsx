import React from 'react'
import './Notification.css'

const Notification = ({ msg }) => {
    if(msg === null) {
        return null;
    }

    return (
        <div className='notification'>
            {msg}
        </div>
    )
}

export default Notification