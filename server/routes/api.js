const express = require('express');
const User = require('../models/user.js');
const MedicalRequest = require('../models/medicalrequest.js');
const HouseRequest = require('../models/houserequest.js');
const TourRequest = require('../models/tourrequest.js');
const NurseRequest = require('../models/nurserequest.js');
const ShoppingRequest = require('../models/shoppingrequest.js');
const Meal = require('../models/meal.js');
const validator = require('validator');
const router = new express.Router();

router.post('/dashboard', (req, res) => {
  //look for user
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) res.send(err);
    res.status(200).json({
    	name:user.name,
    	phone:user.phone,
    	email:user.email,
    	wechat:user.wechat,
    	birthday:user.birthday,
    	address:user.address
    });
  })
});

router.post('/medicine', (req, res) => {
  const validationResult = medicineValidateForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message
    });
  }
  const Data = {
    type:'医疗接送',
    email:req.body.email.trim(),
    service: req.body.service.trim(),
    additional:req.body.additional.trim(),
    time:req.body.time.trim()
  };
const newMedicalRequest = new MedicalRequest(Data);
  newMedicalRequest.save((err) => {
    if (err) res.send(err);
    return res.json({
      success: true,
      message: "医疗接送项目预约已提交！"
    });
  });
});

router.post('/medicalrequest',(req, res) =>{
  MedicalRequest.find({ email: req.body.email }, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
 })

router.post('/house', (req, res) => {
if (req.body.service.trim().length == 0) {
  return res.status(400).json({
    success: false,
    message: "请选择维修项目"
  });
} else {
    
}
const currentDate = new Date(Date.now());
//look for user
const Data = {
  type:"住房维修",
  email:req.body.email.trim(),
  service: req.body.service.trim(),
  additional:req.body.additional.trim(),
  time:currentDate
};
const newHouseRequest = new HouseRequest(Data);
newHouseRequest.save((err) => {
  if (err) res.send(err);
  return res.json({
    success: true,
    message: "维修项目预约已提交！"
  });
});
});

router.post('/houserequest',(req, res) =>{
  HouseRequest.find({ email: req.body.email }, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
 })

 router.post('/tour', (req, res) => {
  const validationResult = tourValidateForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }
  //look for user
  const Data = {
    type:"出行接送",
    email:req.body.email.trim(),
    source: req.body.source.trim(),
    time:req.body.time.trim(),
    destination: req.body.destination.trim(),
    people:req.body.people.trim(),
    additional:req.body.additional.trim()
  };
const newTourRequest = TourRequest(Data);
  newTourRequest.save((err) => {
    if (err) res.send(err);
    return res.json({
      success: true,
      message: "出行接送项目预约已提交！"
    });
  });
});

router.post('/tourrequest',(req, res) =>{
  TourRequest.find({ email: req.body.email }, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
 })

 router.post('/nurse', (req, res) => {
  const validationResult = medicineValidateForm(req.body);
  var expectedDate = req.body.time.trim();
  expectedDate = new Date(expectedDate);
  expectedDate = expectedDate.getTime();
  const nextMonth = Date.now() + 2592000000;
  if(expectedDate<nextMonth) {
    return res.status(400).json({
      success: false,
      message: "预约时间至少提前一个月"
    });
  }
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message
    });
  }
  const Data = {
    type:'帮找月嫂',
    email:req.body.email.trim(),
    service: req.body.service.trim(),
    additional:req.body.additional.trim(),
    time:req.body.time.trim()
  };
const newNurseRequest = new NurseRequest(Data);
  newNurseRequest.save((err) => {
    if (err) res.send(err);
    return res.json({
      success: true,
      message: "找月嫂项目预约已提交！"
    });
  });
});

router.post('/nurserequest',(req, res) =>{
  NurseRequest.find({ email: req.body.email }, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
 })

 router.post('/checkMeal', (req, res) => {
  Meal.find({ email: req.body.email }, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
 })

 router.post('/addMeal', (req, res) => {
  if (req.body.detailedTime=="") {
    return res.status(400).json({
      success: false,
      message: "请选择送餐开始时间段"
    });
  }
  if (!validExpectedDate(req.body.time.trim())) {
    return res.status(400).json({
      success: false,
      message: "请至少提前1天预约"
    });
  }
  var expectedDate = req.body.time.trim();
  expectedDate = new Date(expectedDate);
  expectedDate.setHours(req.body.detailedTime.trim());
  const Data = {
    type:'送餐',
    email:req.body.email.trim(),
    time:expectedDate
  };
const newMeal = new Meal(Data);
  newMeal.save((err) => {
    if (err) res.send(err);
    return res.json({
      success: true,
      message: "送餐项目预约已提交！"
    });
  });
});

router.post('/cancelMeal', (req, res) => {
  Meal.remove({ email: req.body.email }, (err) => {
    if (err) return res.json(err);
    return res.json({
      success: true,
      message: "送餐项目已取消！"
    });
  });
 })

 router.post('/shopping', (req, res) => {
  if (req.body.shoppingList==[]) {
    return res.status(400).json({
      success: false,
      message: "请至少添加一项物品到购物清单"
    });
  }
  const currentDate = new Date(Date.now());
  const Data = {
    type:'买食材',
    email:req.body.email.trim(),
    shoppingList:req.body.shoppingList.trim(),
    time:currentDate,
    additional:req.body.additional.trim()
  };
const newShoppingRequest = new ShoppingRequest(Data);
  newShoppingRequest.save((err) => {
    if (err) res.send(err);
    return res.json({
      success: true,
      message: "买食材申请已提交！（周5采购后会送至您府上）"
    });
  });
});

router.post('/shoppingrequest',(req, res) =>{
  ShoppingRequest.find({ email: req.body.email }, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
 })

function medicineValidateForm(payload) {
  let isFormValid = true;
  let message = '';
  if (!payload ||  payload.service.trim().length === 0) {
    isFormValid = false;
    message = '请选择一项服务';
  }
  if (!validExpectedDate(payload.time.trim())) {
    isFormValid = false;
    message = '预约时间请提前至少一天';
  }

  if (isFormValid) {
    message = '您的申请已提交';
  }
  return {
    success: isFormValid,
    message
  };
}

function tourValidateForm(payload) {
  let isFormValid = true;
  let message = '';
  if (!payload ||  payload.source.trim().length === 0) {
    isFormValid = false;
    message = '请选择出发地';
  }
  else if (payload.destination.trim().length === 0) {
    isFormValid = false;
    message = '请选择目的地';
  }
  if (!validExpectedDate(payload.time.trim())) {
    isFormValid = false;
    message = '预约时间请提前至少一天';
  }
  if (isFormValid) {
    message = '您的申请已提交';
  }
  return {
    success: isFormValid,
    message
  };
}

function validExpectedDate(stringDate) {
  const expectedDate = new Date(stringDate);
  const curDate = new Date(Date.now());
  const tomorrow = Date.now() - curDate.getHours()*3600000 - curDate.getMinutes()*60000 + 86400000;
  if (expectedDate.getTime()>tomorrow) {
    return true;
  }
  else return false;
}


module.exports = router;
