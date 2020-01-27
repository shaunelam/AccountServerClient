import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import Navigation from '../Navigation/Navigation';

const Layout = (props) => {
    return (
        <Grid>
            <Row>
                <Navigation />
            </Row>
            <main>
                {props.children}
            </main>
        </Grid>
    )
}
export default Layout;