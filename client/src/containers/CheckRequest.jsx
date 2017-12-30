import React from 'react';
import HouseView from '../components/HouseView.jsx';
import MedicineView from '../components/MedicineView.jsx';
import TourView from '../components/TourView.jsx';
import NurseView from '../components/NurseView.jsx';
import {ListGroup,ListGroupItem,Button,Panel,Card} from 'react-bootstrap';
import Auth from '../modules/Auth';

class CheckRequest extends React.Component {
	constructor(props) {
	    super(props);

			this.state = { 
				mdata:[],
				hdata:[],
				tdata:[],
				ndata:[],
				mopen: false,
				hopen: false,
				topen: false,
				nopen:false
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
	    txhr.open('post','/api/tourrequest');
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
			
			//get nurserequest
		const nxhr = new XMLHttpRequest();
		nxhr.open('post','/api/nurserequest');
		nxhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		// set the authorization HTTP header
		nxhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
		nxhr.responseType = 'json';
		nxhr.send(formData);
		nxhr.addEventListener('load', () => {
			if (nxhr.status === 200) {
				this.setState({
					 ndata: nxhr.response,
				});
			}
		});
  }

  render() {
    return (
      <div>
				<Button bsSize="lg" style = {{margin:"auto",
			display:"block"}} onClick={() => this.setState({ mopen: !this.state.mopen })}>
          医疗接送
        </Button>
				<Panel collapsible expanded={this.state.mopen}>
					{this.state.mdata.length && this.state.mdata.map(Data => <MedicineView key={Data._id} {...Data} />)}
				</Panel>
				<Button bsSize="lg" style = {{margin:"auto",
			display:"block"}} onClick={() => this.setState({ hopen: !this.state.hopen })}>
				住房维修	
        </Button>
				<Panel collapsible expanded={this.state.hopen}>
					{this.state.hdata.length && this.state.hdata.map(Data => <HouseView key={Data._id} {...Data} />)}
				</Panel>
				<Button bsSize="lg" style = {{margin:"auto",
			display:"block"}} onClick={() => this.setState({ topen: !this.state.topen })}>
				出行接送
        </Button>
				<Panel collapsible expanded={this.state.topen}>
					{this.state.tdata.length && this.state.tdata.map(Data => <TourView key={Data._id} {...Data} />)}
				</Panel>
				<Button bsSize="lg" style = {{margin:"auto",
			display:"block"}} onClick={() => this.setState({ nopen: !this.state.nopen })}>
				帮找月嫂
        </Button>
				<Panel collapsible expanded={this.state.nopen}>
					{this.state.ndata.length && this.state.ndata.map(Data => <NurseView key={Data._id} {...Data} />)}
				</Panel>
      </div>
    );
  }

}

export default CheckRequest;