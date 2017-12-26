import React, { PropTypes } from 'react';
import MedicineForm from '../components/MedicineForm.jsx';
import Auth from '../modules/Auth';


class MedicinePage extends React.Component {

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
      time:''
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
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
    const time = encodeURIComponent(this.state.time);
    const formData = `email=${email}&service=${service}&additional=${additional}&time=${time}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/medicine');
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
        this.context.router.replace('/');
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

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    if (event.target.type == "radio") {
      this.setState({
        service : event.target.value
      });
    } else {
        if (event.target.name == 'additional') {
          this.setState({
            additional : event.target.value
          });
        } else if (event.target.name == 'time') {
          this.setState({
            time : event.target.value
          });
        }
      }
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <MedicineForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        additional={this.state.additional}
        time={this.state.time}
      />
    );
  }

}

MedicinePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default MedicinePage;
