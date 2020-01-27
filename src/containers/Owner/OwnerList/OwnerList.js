import React, { Fragment, useEffect } from 'react';
import { Table, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import Owner from '../../../components/OwnerComponents/Owner/Owner';


const OwnerList = (props) => {

    let owners = [];

    const data = useSelector(state => state.repository.data);

    if (data && data.length > 0) {
        owners = data.map(owner => {
            return (
                <Owner key={owner.id} owner={owner} {...props} />
            )
        })
    }
    const dispatch = useDispatch();

    useEffect(() => {
        let url = '/api/owner';
        dispatch(repositoryActions.getData(url, { ...props }));
    },[dispatch, props])

    return (
        <Fragment>
            <Row>
                <Col mdOffset={10} md={2}>
                    <Link to='/createOwner' >Create Owner</Link>
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={12}>
                    <Table responsive striped>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date of birth</th>
                                <th>Address</th>
                                <th>Details</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {owners}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Fragment>
    )
}

export default OwnerList;