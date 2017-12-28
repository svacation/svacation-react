import React, { PropTypes } from 'react';
import HouseForm from '../components/HouseForm.jsx';
import Auth from '../modules/Auth';


class HousePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      email: '',
      service: '',
      additional: '',
    };

    this.processForm = this.processForm.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const email = encodeURIComponent(Auth.getUser());
    const service = encodeURIComponent(this.state.service);
    const additional = encodeURIComponent(this.state.additional);
    const formData = `email=${email}&service=${service}&additional=${additional}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/house');
     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        // make a redirect
        this.context.router.replace('/houserequest');
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  changeState(event) {
    if (event.target.type == "radio") {
      this.setState({
        service : event.target.value
      });
    } else {     
      this.setState({
        additional : event.target.value
      });
      }
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <HouseForm
        onSubmit={this.processForm}
        onChange={this.changeState}
        errors={this.state.errors}
        additional={this.state.additional}
      />
    );
  }

}

HousePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default HousePage;
