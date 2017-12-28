import React from 'react';
import HouseView from '../components/HouseView.jsx';
import MedicineView from '../components/MedicineView.jsx';
import TourView from '../components/TourView.jsx';
import Auth from '../modules/Auth';

class CheckRequest extends React.Component {
	constructor(props) {
	    super(props);

			this.state = { 
				mdata:[],
				hdata:[],
				tdata:[]
			 };
  	}
	componentDidMount() {
		//find email as token
		const email = encodeURIComponent(Auth.getUser());
		const formData = `email=${email}`;
		//get houserequest
		const hxhr = new XMLHttpRequest();
		hxhr.open('post','/api/houserequest');
		hxhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		// set the authorization HTTP header
		hxhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
		hxhr.responseType = 'json';

		hxhr.send(formData);
		hxhr.addEventListener('load', () => {
			if (hxhr.status === 200) {
				this.setState({
						hdata: hxhr.response,
				});
			}
		});
		//get houserequest
		const mxhr = new XMLHttpRequest();
		mxhr.open('post','/api/medicalrequest');
		mxhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		// set the authorization HTTP header
		mxhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
		mxhr.responseType = 'json';
		mxhr.send(formData);
		mxhr.addEventListener('load', () => {
			if (mxhr.status === 200) {
				this.setState({
						mdata: mxhr.response,
				});
			}
		});
		//get tourrequest
		const txhr = new XMLHttpRequest();
	    txhr.open('post','/api/TourRequest');
	    txhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	    // set the authorization HTTP header
	    txhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
	    txhr.responseType = 'json';
	    txhr.send(formData);
	    txhr.addEventListener('load', () => {
	      if (txhr.status === 200) {
	        this.setState({
	           tdata: txhr.response,
	        });
	      }
	    });
  }

  render() {
    return (
      <div>
				{this.state.mdata.length && this.state.mdata.map(Data => <MedicineView key={Data._id} {...Data} />)}
				{this.state.hdata.length && this.state.hdata.map(Data => <HouseView key={Data._id} {...Data} />)}
				{this.state.tdata.length && this.state.tdata.map(Data => <TourView key={Data._id} {...Data} />)}
      </div>
    );
  }

}

export default CheckRequest;