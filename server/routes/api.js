const express = require('express');
const User = require('../models/user.js');
const MedicalRequest = require('../models/medicalrequest.js');
const validator = require('validator');


const router = new express.Router();


//  
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
  const validationResult = validateMedicineForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }
  const timeInMiliSecond = req.body.time.trim()*86400000;
  const extimateDate = new Date(Date.now()+timeInMiliSecond);
  const year = extimateDate.getFullYear();
  const month = extimateDate.getMonth();
  const day = extimateDate.getDate();
  const newDate = year + "/" + month +"/" + day;
  //look for user
  const Data = {
    email:req.body.email.trim(),
    service: req.body.service.trim(),
    additional:req.body.additional.trim(),
    time:newDate
  };
const newMedicalRequest = new MedicalRequest(Data);
  newMedicalRequest.save((err) => {
    if (err) res.send(err);
    return res.send(null);
  });
});

router.get('/medicalrequest',(req, res) =>{
 MedicalRequest.find(function(err, data) {
 return res.json(data);
 });
 })


function validateMedicineForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload ||  payload.service.trim().length === 0) {
    isFormValid = false;
    errors.service = '请选择一项服务';
  }

  if (!payload || payload.time.trim().length === 0) {
    isFormValid = false;
    errors.time = '请正确填写服务时间';
  }

  if (!isFormValid) {
    message = '申请内容不完整';
  } else {
    message = '您的申请已提交';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

module.exports = router;
