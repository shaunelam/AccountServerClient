import React, { useState, useEffect } from "react";
import Input from "../../../UI/Input/Input";
import { Form, Well, Button, FormGroup, Col } from "react-bootstrap";
import { returnInputConfigurationAccount } from "../../../Utility/accountInputConfiguration";
import * as formUtilityActions from "../../../Utility/FormUtility";
import { useSelector, useDispatch } from "react-redux";
import * as repositoryActions from "../../../store/actions/repositoryActions";
import * as errorHandlerActions from "../../../store/actions/ErrorHandlerActions";
import SuccessModal from "../../../components/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../../components/Modals/ErrorModal/ErrorModal";

const CreateAccount = props => {
  const [AccountForm, setAccountForm] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const dispatch = useDispatch();

  const showErrorModal = useSelector(
    state => state.errorHandler.showErrorModal
  );
  const showSuccessModal = useSelector(
    state => state.repository.showSuccessModal
  );
  const errorMessage = useSelector(state => state.errorHandler.errorMessage);

  useEffect(() => {
    setAccountForm(returnInputConfigurationAccount());
  }, []);

  const formElementsArray = formUtilityActions.convertStateToArrayOfFormObjects(
    { ...AccountForm }
  );

  const CreateAccount = event => {
    event.preventDefault();

    const accountToCreate = {
      accountType: AccountForm.accountType.value,
      dateCreated: AccountForm.dateCreated.value,
      ownerId: props.match.params.ownerId
    };

    const url = "/api/account";
    dispatch(repositoryActions.postData(url, accountToCreate, { ...props }));
  };

  const handleChangeEvent = (event, id) => {
    const updatedAccountForm = { ...AccountForm };

    updatedAccountForm[
      id
    ] = formUtilityActions.executeValidationAndReturnFormElement(
      event,
      updatedAccountForm,
      id
    );

    const counter = formUtilityActions.countInvalidElements(updatedAccountForm);

    setAccountForm(updatedAccountForm);
    setIsFormValid(counter === 0);
  };

  const redirectToAccountList = () => {
    props.history.push("/owner-List");
  };

  return (
    <Well>
      <Form horizontal onSubmit={CreateAccount}>
        {formElementsArray.map(element => {
          return (
            <Input
              key={element.id}
              elementType={element.config.element}
              id={element.id}
              label={element.config.label}
              type={element.config.type}
              value={element.config.value}
              changed={event => handleChangeEvent(event, element.id)}
              errorMessage={element.config.errorMessage}
              invalid={!element.config.valid}
              shouldValidate={element.config.validation}
              touched={element.config.touched}
              blur={event => handleChangeEvent(event, element.id)}
            />
          );
        })}
        <br />
        <FormGroup>
          <Col mdOffset={6} md={1}>
            <Button type="submit" bsStyle="info" disabled={!isFormValid}>
              Create
            </Button>
          </Col>
          <Col md={1}>
            <Button bsStyle="danger" onClick={redirectToAccountList}>
              Cancel
            </Button>
          </Col>
        </FormGroup>
        <SuccessModal
          show={showSuccessModal}
          modalHeaderText={"Success message"}
          modalBodyText={"Action completed successfully"}
          okButtonText={"OK"}
          successClick={() =>
            dispatch(
              repositoryActions.closeSuccessModal({ ...props }, "/owner-List")
            )
          }
        />
        <ErrorModal
          show={showErrorModal}
          modalHeaderText={"Error message"}
          modalBodyText={errorMessage}
          okButtonText={"OK"}
          closeModal={() => dispatch(errorHandlerActions.closeErrorModal())}
        />
      </Form>
    </Well>
  );
};

export default CreateAccount;
