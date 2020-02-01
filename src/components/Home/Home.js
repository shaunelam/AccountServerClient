import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './Home.css';
import Logo from '../Images/bank.png';

const Home = (props) => {
    return (
        <Row>
            <Col md={12}>
                <div className={'homeText'}>
                    <img src={Logo} alt='homepageimage' />
                </div>
                <div className={'text'} >
                    Create Your Own Acount
                </div>
            </Col>
        </Row>
    )
}

export default Home;