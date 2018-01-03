import React, { PropTypes } from 'react';
import FoodForm from '../components/FoodForm.jsx';
import Auth from '../modules/Auth';
import moment from 'moment';


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
      startOpen: false,
      cancelOpen: false,
      shoppingOpen: false,
      detailedTime: '',
      time: moment(),
      detailedTime: '',
      shoppingList: [],
      item: '',
      numberOfItem: '',
      haveMeal: '',
      shoppingListString: ''
    };

    this.processForm = this.processForm.bind(this);
    this.changeState = this.changeState.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.toggle = this.toggle.bind(this);
    this.addItem = this.addItem.bind(this);
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
    let formData;
    let url;
    if (event.target.name == "startForm") {
      // create a string for an HTTP body message
      const time = encodeURIComponent(this.state.time);
      const detailedTime = encodeURIComponent(this.state.detailedTime);
      formData = `email=${email}&detailedTime=${detailedTime}&time=${time}`;
      url = '/api/addMeal';
    } else if (event.target.name == "cancelForm") {
      formData = `email=${email}`;
      url = '/api/cancelMeal';
    } else if (event.target.name == "shoppingForm") {
      const shoppingList = encodeURIComponent(this.state.shoppingList);
      const additional = encodeURIComponent(this.state.additional);
      formData = `email=${email}&shoppingList=${shoppingList}&additional=${additional}`;
      url = '/api/shopping';
    }
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
    xhr.send(formData);
  }

  changeState(event) {
    if (event.target.type == "radio") {
      this.setState({
        detailedTime: event.target.value
      });
    } else {
      if (event.target.name == "additional") {
        this.setState({
          additional: event.target.value
        });
      } else if (event.target.name == "item") {
        this.setState({
          item: event.target.value
        });
      } else if (event.target.name == "numberOfItem") {
        this.setState({
          numberOfItem: event.target.value
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
    if (this.state.numberOfItem == "") {
      this.setState({
        errors: "请选择食材数量"
      });
      return;
    } else if (this.state.item == "") {
      this.setState({
        errors: "请选择食材"
      });
      return;
    } else {
      let newShoppingList = this.state.shoppingList;
      let items = "";
      newShoppingList.push({ item: this.state.item, numberOfItem: this.state.numberOfItem });
      for (var i = 0; i < newShoppingList.length; i++) {
        items = items + newShoppingList[i].item + " " + newShoppingList[i].numberOfItem + " ";
      }
      this.setState({
        shoppingList: newShoppingList,
        shoppingListString: items
      });
      console.log(this.state);
    }
  }

  componentDidMount() {
    const email = encodeURIComponent(Auth.getUser());
    //find if there is meal entry for this user
    const formData = `email=${email}`;
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'api/checkMeal');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        if (xhr.response != "") {
          this.setState({ haveMeal: true });
        } else {
          this.setState({ haveMeal: false });
        }
      } else {
        // failure
        this.setState({
          errors: "fail to retrive meal"
        });
      }
    });
    xhr.send(formData)
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
        changeDate={this.changeDate}
        toggle={this.toggle}
        time={this.state.time}
        startOpen={this.state.startOpen}
        cancelOpen={this.state.cancelOpen}
        shoppingOpen={this.state.shoppingOpen}
        haveMeal={this.state.haveMeal}
        item={this.state.item}
        numberOfItem={this.state.numberOfItem}
        shoppingList={this.state.shoppingList}
        addItem={this.addItem}
        shoppingListString={this.state.shoppingListString}
      />
    );
  }

}

FoodPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default FoodPage;
