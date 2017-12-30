import React, { PropTypes } from 'react';
import TourForm from '../components/TourForm.jsx';
import Auth from '../modules/Auth';
import moment from 'moment';


class TourPage extends React.Component {

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
      time:moment(),
      hour:'',
      people:'',
      destination:'',
      source: ''
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
    const source = encodeURIComponent(this.state.source);
    const destination = encodeURIComponent(this.state.destination);
    const additional = encodeURIComponent(this.state.additional);
    const time = encodeURIComponent(this.state.time);
    const hour = encodeURIComponent(this.state.hour);
    const people = encodeURIComponent(this.state.people);
    const formData = `email=${email}&source=${source}&destination=${destination}&additional=${additional}&time=${time}&hour=${hour}&people=${people}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/tour');
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

        const errors= xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  changeState(event) {
    if (event.target.name == 'source') {
        this.setState({
            source : event.target.value
        });
      }
    else if (event.target.name == 'destination') {
        this.setState({
          destination : event.target.value
        });
      }
    else if (event.target.name == 'additional') {
        this.setState({
        additional : event.target.value
        });
    } 
      else if (event.target.name == 'people') {
        this.setState({
        people : event.target.value
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
      <TourForm
        onSubmit={this.processForm}
        onChange={this.changeState}
        errors={this.state.errors}
        additional={this.state.additional}
        time={this.state.time}
        people={this.state.people}
        changeDate={this.changeDate}
      />
    );
  }

}

TourPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default TourPage;
