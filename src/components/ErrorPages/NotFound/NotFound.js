import React from 'react';
import './NotFound.css'
import Logo from '../../../components/Images/error.png'

const NotFound = (props) => {
    return (
        <p className={'notFound'}>
            <img src={Logo} alt="NotFoundPage" />
            <h1>Page Not Found</h1>
        </p>
    )
}

export default NotFound;