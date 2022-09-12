const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');

const Contact=require('./models/contact');

const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// // middleware1
// app.use(function(req,res,next){
//   req.myName='arpan';
//   // console.log('middleware 1 is called');
//   next();
// });
// middleware2

// app.use(function(req,res,next){
//   // console.log('middleware 2 is called');
//   console.log('my name from mw2',req.myName);
//   next();
// });

var contactList=[
  {
    name:"arpan",
    phone:"1111111111"
  },
    {
    name:"tony stark",
    phone:"12345678"
  },
    {
    name:"coding ninjas",
    phone:"109876544"
  }
]

app.get('/',function(req,res){
 
  // console.log('from get route controller',req.myName); 
  
  Contact.find({},function(err,contacts){
   if(err){
      console.log('err in fetching contacts from db');return;}
return res.render('home',{title:"Contacts list",
   contact_list:contacts
});

  });
//   return res.render('home',{title:"Contacts list",
//    contact_list:contactList
// });

});

app.get('/practice',function(req,res){
  
 return res.render('practice',{
title:"lets play with ejs"
 });
});

app.post('/create-contact',function(req,res){
 
// contactList.push({
//   name:req.body.name,
//   phone:req.body.phone
// });
// contactList.push(req.body);

Contact.create({
    name:req.body.name,
    phone:req.body.phone
},function(err,newContact){
  if(err){
  console.log(errr);
  return;}
  console.log('*****',newContact);
  return res.redirect('back');
});
// return res.redirect('back');

});
app.get('/delete-contact',function(req,res){
     let id=req.query.id;
     Contact.findByIdAndDelete(id,function(err){
        if(err){
          console.log('err in deleting an obj from db');return;
        }
        return res.redirect('back');
     })
})
app.get('/delete-contact/',function(req,res){
  console.log(req.query);
  let phone=req.query.phone;
});

app.listen(port,function(err){
 if(err){
    console.log(err);return;
 }
 console.log('yupp!my express server is now running on port:',port);
});