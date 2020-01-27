import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Well, Row, Col } from "react-bootstrap";
import * as repositoryActions from "../../../store/actions/repositoryActions";
import Moment from "react-moment";
import OwnersAccounts from "../../../components/OwnerComponents/OwnersAccounts/OwnersAccounts";


const OwnerDetails = () => {

    const owner = useSelector(state=> state.repository.data);

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