import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      user : {
      name: '',
      phone: '',
      email: '',
      wechat: '',
      successMessage:'',
      birthday: ''
      },
      mopen: false,
      topen: false
    };
    this.toggle = this.toggle.bind(this);
  }
/**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  toggle(event) {
    event.preventDefault();
    if (event.target.name == "mbutton") {
      this.setState({
        mopen: !this.state.mopen
      });
    }
    else if (event.target.name == "tbutton") {
      this.setState({
        topen: !this.state.topen
      });
    }
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('post','/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';

    const email = encodeURIComponent(Auth.getUser());
    const formData = `email=${email}`;
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const storedMessage = localStorage.getItem('successMessage');
        if (storedMessage) {
          this.setState({
            successMessage: storedMessage
          })
          localStorage.removeItem('successMessage');
        } 
        this.setState({
          name: xhr.response.name,
          phone: xhr.response.phone,
          email: xhr.response.email,
          wechat: xhr.response.wechat,
          birthday: xhr.response.birthday,
          address: xhr.response.address
        });
      }
    });
    xhr.send(formData);
  }

  /**
   * Render the component.
   */
  render() {
    return (
    <Dashboard 
      name={this.state.name} 
      phone={this.state.phone}
      email={this.state.email}
      wechat={this.state.wechat}
      birthday={this.state.birthday}
      address={this.state.address}
      successMessage={this.state.successMessage}
      toggle={this.toggle}
      mopen={this.state.mopen}
      topen={this.state.topen}
      />
    );
  }

}

export default DashboardPage;
