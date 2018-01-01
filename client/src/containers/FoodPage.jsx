import React, { PropTypes } from 'react';
import FoodForm from '../components/FoodForm.jsx';
import Auth from '../modules/Auth';


class FoodPage extends React.Component {

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
      startOpen:false,
      cancelOpen: false,
      shoppingOpen: false,
      detailedTime:'',
      time:'',
      detailedTime:'',
      additional:'',
      formData:'',
      shoppingList:[],
      item:'',
      numberOfItem:''
    };

    this.processForm = this.processForm.bind(this);
    this.changeState = this.changeState.bind(this);
    this.changeDate = this .changeDate.bind(this);
    this.cancelConfirm = this.cancelConfirm.bind(this);
    this.createAJAX = this.createAJAX.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    const email = encodeURIComponent(Auth.getUser());
    if (event.target.name == "startForm"){
      // create a string for an HTTP body message
      const time = encodeURIComponent(this.state.time);
      const detailedTime = encodeURIComponent(this.state.detailedTime);
      const additional = encodeURIComponent(this.state.additional);
      this.setState({
        formData:`email=${email}&detailedTime=${detailedTime}&time=${time}&additional=${additional}`
      });
      createAJAX('/api/addMeal');
    } else if (event.target.name == "cancelForm") {
      this.setState({
        formData:`email=${email}`
      });
      createAJAX('/api/cancelMeal');
    } else if (event.target.name == "shoppingForm") {
      const shoppingList = encodeURIComponent(this.state.shoppingList);
      this.setState({
        formData:`email=${email}&shoppingList=${shoppingList}`
      });
      createAJAX('/api/shopping');
    }
  }

  changeState(event) {
    if (event.target.type == "radio") {
      this.setState({
        detailedTime : event.target.value
      });
    } else {  
        if(event.target.name == "additional"){   
          this.setState({
            additional : event.target.value
          });
        } else if(event.target.name == "item"){   
          this.setState({
            item : event.target.value
          });
        } else if(event.target.name == "item"){   
          this.setState({
            item : event.target.value
          });
        } else if(event.target.name == "numberOfItem"){   
          this.setState({
            numberOfItem : event.target.value
          });
        }
     }
}
  changeDate(date) {
    this.setState({
      time: date
    });
  }

  toggle(event) {
    event.preventDefault();
    if (event.target.name == "startButton") {
      this.setState({
        startOpen: !this.state.startOpen
      });
    }
    else if (event.target.name == "cancelButton") {
      this.setState({
        cancelOpen: !this.state.cancelOpen
      });
    } else if (event.target.name == "shoppingButton") {
      this.setState({
        shoppingOpen: !this.state.shoppingOpen
      });
    }
  }

  addItem(event) {
    const newShoppingList = this.state.shoppingList.slice();
    newShoppingList.add({item:this.state.item,numberOfItem:this.state.numberOfItem});
    this.setState({
      shoppingList : newShopplist
    });
  }

  createAJAX(url) {
    const xhr = new XMLHttpRequest();
      xhr.open('post', url);
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
      xhr.send(this.state.formData);
  }
  /**
   * Render the component.
   */
  render() {
    return (
      <FoodForm
        onSubmit={this.processForm}
        onChange={this.changeState}
        errors={this.state.errors}
        additional={this.state.additional}
        cancelConfirm={this.cancelConfirm}
        changeDate={this.changeDate}
        toggle = {this.toggle}
        time = {this.state.time}
        startOpen = {this.state.startOpen}
        cancelOpen = {this.state.cancelOpen}
        haveMeal = {this.haveMeal}
        item = {this.state.item}
        shoppingList={this.state.shoppingList}
      />
    );
  }

}

FoodPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default FoodPage;
