import React, { Component } from "react";
import { Form, Well, Button, FormGroup, Col } from "react-bootstrap";
import { returnInputConfigurationAccount } from "../../Utility/accountInputConfiguration";
import * as formUtilityActions from "../../Utility/FormUtility";
import Input from "../../UI/Input/Input";
import * as repositoryActions from "../../store/actions/repositoryActions";
import * as errorHandlerActions from "../../store/actions/ErrorHandlerActions";
import { connect } from "react-redux";
import moment from "moment";
import SuccessModal from "../../components/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../components/Modals/ErrorModal/ErrorModal";

class UpdateAccount extends Component {
  state = {
    accountForm: {},
    isFormValid: true
  };

  componentWillMount = () => {
    this.setState({ accountForm: returnInputConfigurationAccount() });
  };

  componentDidMount = () => {
    const id = this.props.match.params.id;
    const url = "/api/account/" + id;
    this.props.onGetAccountById(url, { ...this.props });
  };

  componentWillReceiveProps = (nextProps) => {
	const updatedAccountForm = { ...this.state.accountForm };
	let typenameObject = { ...updatedAccountForm.accountType };
	let dateObject = { ...updatedAccountForm.dateCreated };

	typenameObject.value = nextProps.data.accountType;
	typenameObject.valid = true;
	dateObject.value = moment(nextProps.data.dateCreated);

	updatedAccountForm['accountType'] = typenameObject;
	updatedAccountForm['dateCreated'] = dateObject;
	this.setState({ accountForm: updatedAccountForm });
}
updateAccount = (event) => {
    event.preventDefault();

    const accountToUpdate = {
 	accountType: this.state.accountForm.accountType.value
    }

    const url = "/api/account/" + this.props.data.id;

    this.props.onUpdateAccount(url, accountToUpdate, {...this.props});
}
    
  redirectToOwnerList = () => {
    this.props.history.push("/owner-List");
  };

  handleChangeEvent = (event, id) => {
    const updatedAccountForm = { ...this.state.accountForm };

    updatedAccountForm[
      id
    ] = formUtilityActions.executeValidationAndReturnFormElement(
      event,
      updatedAccountForm,
      id
    );

    const counter = formUtilityActions.countInvalidElements(updatedAccountForm);

    this.setState({ accountForm: updatedAccountForm, isFormValid: counter === 0 });
  };
    
  render() {
    const formElementsArray = formUtilityActions.convertStateToArrayOfFormObjects(
      { ...this.state.accountForm }
    );

    return (
      <Well>
        <Form horizontal onSubmit={this.updateAccount}>
        
          {formElementsArray.map(element => {
            return (
              <Input
                key={element.id}
                elementType={element.config.element}
                id={element.id}
                label={element.config.label}
                type={element.config.type}
                value={element.config.value}
                changed={event => this.handleChangeEvent(event, element.id)}
                errorMessage={element.config.errorMessage}
                invalid={!element.config.valid}
                shouldValidate={element.config.validation}
                touched={element.config.touched}
                blur={event => this.handleChangeEvent(event, element.id)}
              />
            );
          })}
          <br />
          <FormGroup>
            <Col mdOffset={6} md={1}>
              <Button
                type="submit"
                bsStyle="info"
                disabled={!this.state.isFormValid}
              >
                Update
              </Button>
            </Col>
            <Col md={1}>
              <Button bsStyle="danger" onClick={this.redirectToOwnerList}>
                Cancel
              </Button>
            </Col>
          </FormGroup>
        </Form>
        <SuccessModal
          show={this.props.showSuccessModal}
          modalHeaderText={"Success message"}
          modalBodyText={"Action completed successfully"}
          okButtonText={"OK"}
          successClick={() =>
            this.props.onCloseSuccessModal("/owner-List", { ...this.props })
          }
        />
        <ErrorModal
          show={this.props.showErrorModal}
          modalHeaderText={"Error message"}
          modalBodyText={this.props.errorMessage}
          okButtonText={"OK"}
          closeModal={() => this.props.onCloseErrorModal()}
        />
      </Well>
    );
  }
}
const mapStateToProps = state => {
  return {
    data: state.repository.data,
    showSuccessModal: state.repository.showSuccessModal,
    showErrorModal: state.errorHandler.showErrorModal,
    errorMessage: state.errorHandler.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetAccountById: (url, props) =>
      dispatch(repositoryActions.getData(url, props)),
    onUpdateAccount: (url, owner, props) =>
      dispatch(repositoryActions.putData(url, owner, props)),
    onCloseSuccessModal: (url, props) =>
      dispatch(repositoryActions.closeSuccessModal(props, url)),
    onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccount);
