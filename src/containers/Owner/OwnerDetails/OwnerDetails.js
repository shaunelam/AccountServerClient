import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Well, Row, Col } from "react-bootstrap";
import * as repositoryActions from "../../../store/actions/repositoryActions";
import Moment from "react-moment";
import OwnersAccounts from "../../../components/OwnerComponents/OwnersAccounts/OwnersAccounts";


const OwnerDetails = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        let id = props.match.params.id;
        let url = '/api/owner/' + id + '/account';
        dispatch(repositoryActions.getData(url, {...props}))
    },[props,dispatch])
    
    const owner = useSelector(state=> state.repository.data);

    const renderTypeOfUserConditionally = (owner) => {
        let typeOfUser = null;
    
        if (owner.accounts && owner.accounts.length <= 2) {
            typeOfUser = (
                <Row>
                    <Col md={3}>
                        <strong>Type of user:</strong>
                    </Col>
                    <Col md={3}>
                        <span className={'text-success'}>Beginner user.</span>
                    </Col>
                </Row>
            );
        }
        else {
            typeOfUser = (
                <Row>
                    <Col md={3}>
                        <strong>Type of user:</strong>
                    </Col>
                    <Col md={3}>
                        <span className={'text-info'}>Advanced user.</span>
                    </Col>
                </Row>
            );
        }
    
        return typeOfUser;
    }

    return (
        <Fragment>
            <Well>
                <Row>
                    <Col md={3}>
                        <strong>Owner name:</strong>
                    </Col>
                    <Col md={3}>
                        {owner.name}
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <strong>Date of birth:</strong>
                    </Col>
                    <Col md={3}>
                        <Moment format="DD/MM/YYYY">{owner.dateOfBirth}</Moment>
                    </Col>
                </Row>
                {renderTypeOfUserConditionally(owner)}
            </Well>
            <OwnersAccounts accounts={owner.accounts} />
        </Fragment>
    )
}

export default OwnerDetails;