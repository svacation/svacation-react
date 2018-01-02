import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Button, ButtonToolbar,ToggleButton,ToggleButtonGroup,Panel,FormGroup,ControlLabel,FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FoodForm = ({
  onSubmit,
  onChange,
	changeDate,
	toggle,
  errors,
  additional,
  time,
  startOpen,
	cancelOpen,
	shoppingOpen,
  haveMeal,
	item,
	addItem,
	numberOfItem,
	shoppingListString
}) => (
  <Card className="container">
  {errors && <p className="error-message">{errors}</p>}
    <form action="/" onSubmit={onSubmit} name="startForm"> 
      {!haveMeal&&<Button bsSize="lg" onClick={toggle} name="startButton">
          申请送餐服务（送餐申请提交后将持续直到取消送餐服务）
        </Button>}
       <Panel collapsible expanded={startOpen}>
			<CardText>选择送餐开始日期（请至少提前1天预约 ）</CardText>
	        <DatePicker selected={time} onChange={changeDate}/>
	        <ToggleButtonGroup type="radio" name = "detailedTime">
		        <ToggleButton value="8" onChange={onChange}>早</ToggleButton>
		        <ToggleButton value="12" onChange={onChange}>中</ToggleButton>
		        <ToggleButton value="18" onChange={onChange}>晚</ToggleButton>
      		</ToggleButtonGroup>
      		<div className="button-line">
	        	<RaisedButton type="submit" label="提交" primary><Link to={'/'}/></RaisedButton>
	      	</div>
        </Panel>
    </form>
    <form action="/" onSubmit={onSubmit} name="cancelForm">
      {haveMeal&&<Button bsSize="lg" onClick={toggle} name="cancelButton" style = {{margin:"auto",width:"50%",
			display:"block"}}>
          取消送餐服务
        </Button>}
        <Panel collapsible expanded={cancelOpen}>
			<CardText>确定取消订餐服务？</CardText>
	        <div className="button-line">
	        	<RaisedButton type="submit" label="确定" primary><Link to={'/'}/></RaisedButton>
	      	</div>
        </Panel>
      </form>

      <form action="/" onSubmit={onSubmit} name="shoppingForm">
      	<Button bsSize="lg" onClick={toggle} name="shoppingButton" style = {{margin:"auto",width:"50%",
			display:"block"}}>
          购买食材
        </Button>
        <Panel collapsible expanded={shoppingOpen}>
	      <CardText>公司每周5将进行一次采购，会将您这周申请的购买的食材在送餐的同时送至您的府上</CardText>
      	  <FormGroup controlId="formControlsSelect" >
			  <ControlLabel>请选择您想购买的食材</ControlLabel>
		      <FormControl componentClass="select" placeholder="select" name = "item" onChange={onChange} style = {{margin:"auto",width:"50%",
			display:"block"}}>
		      <option></option>
		        <option>番茄</option>
		        <option>土豆</option>
		      </FormControl>
		  </FormGroup>
		  <CardText>如果上面没有您需要的食材，请在下面的框中填写</CardText>
		  <div className="field-line">
		        <TextField
		          floatingLabelText="食材"
		          name="item"
		          onChange={onChange}
		          value={item}
		        />
	      </div>
	      <FormGroup controlId="formControlsSelect" >
			  <ControlLabel>请选择您想购买食材的数量</ControlLabel>
		      <FormControl componentClass="select" placeholder="select" name = "numberOfItem" onChange={onChange} style={{width:30}} style = {{margin:"auto",width:"50%",
			display:"block"}}>
					<option></option>
		      <option>1</option>
		        <option>2</option>
		        <option>3</option>
		      </FormControl>
		  </FormGroup>
	      <Button bsSize="lg" onClick={addItem} name="addItem">
	          将食材加入您的购物清单
	      </Button>
	      <div className="field-line">
	        <TextField
	          floatingLabelText="购物清单"
						value={shoppingListString}
	        />
	      </div>
	      <div className="field-line">
	        <TextField
	          floatingLabelText="特殊要求"
	          name="additional"
	          onChange={onChange}
	          value={additional}
	        />
	      </div>
	      <CardText>请确认选取所需食材后再提交</CardText>
	      <div className="button-line">
	        <RaisedButton type="submit" label="提交" primary />
	      </div>
	    </Panel>  
    </form>
    <h4>急事请打电话 XXX-XXXX-XXXX 微信有时无法及时回复 </h4>
  </Card>
);

FoodForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FoodForm;

