import React, { PropTypes } from 'react';
import NurseForm from '../components/NurseForm.jsx';
import Auth from '../modules/Auth';
import moment from 'moment';


class NursePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: '',
      email: '',
      service: '',
      additional: '',
      time:moment()
    };

    this.processForm = this.processForm.bind(this);
    this.changeState = this.changeState.bind(this);
    this.changeDate = this.changeDate.bind(this);
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
    xhr.open('post', '/api/nurse');
     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        localStorage.setItem('successMessage', xhr.response.message);
        // change the component-container state
        this.setState({
          errors: ''
        });

        // make a redirect
        this.context.router.replace('/');
      } else {
        // failure
        const errors = xhr.response.message;
        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  changeState(event) {
    if (event.target.name == 'service') {
      this.setState({
        service : event.target.value
      });
    }
  else if (event.target.name == 'additional') {
      this.setState({
        additional : event.target.value
      });
    }
  }

  changeDate(date) {
    this.setState({
      time: date
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <NurseForm
        onSubmit={this.processForm}
        onChange={this.changeState}
        errors={this.state.errors}
        additional={this.state.additional}
        changeDate={this.changeDate}
        time={this.state.time}
        service={this.state.service}
      />
    );
  }

}

NursePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default NursePage;
