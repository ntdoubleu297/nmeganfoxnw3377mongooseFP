const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
//const connectDb = require('./db/database');
const port = process.env.PORT || 5000;
const User = require('./db/user.model');
const { default: mongoose } = require('mongoose');
// configure express to use cors()
// ------------------------------------------------------------------
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://nw3377:Whi31560@cluster0.cppma.mongodb.net/nw3377?retryWrites=true&w=majority')

app.get('/users', async (req, res) => { //this is right 
  const users = await User.find();

  res.json(users);
});

app.post('/user/create', async (req, res) => { //this is right.
    console.log(req.body);
  try{
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        balance: req.body.balance
      }) 
      res.json(user);
      console.log('status ok');
        }catch(err){
        console.log('status error, error duplicate email');
    }
  });



app.post('/user/login', async (req, res) => { //this is right
    const user = await User.findOne({
        email: req.body.email
        //password: req.body.password
    })
    res.json(user);
    if (user){
        console.log('status ok') 
    }else{
        console.log('status error, no email available')
    }
})

app.post('/user/logout', async (req, res) => { //this is right
    const user = await User.findOne({
        email: req.body.email
        //password: req.body.password
    })
    res.json(user);
    if (user){
        console.log('status ok') 
    }else{
        console.log('status error, no email available')
    }
})



app.post('/user/balance', async (req,res) => {
    const token = req.headers['x-access-token']
    try{
        //const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email;
    
    const user = await User.findOne(
        {email: email }
    )
    //return res.json({status = 'ok', balance: user.balance})
    } catch(error) {
    res.json({status: 'error', error: 'invalid token'})
}
})




app.get("/user/balance", async (req, res) => {
    try {
        let myquery = { email: req.params.email, balance: req.params.balance };
    const user = await User.updateOne(myquery, {$set: {balance: req.body.balance}}
        )
    return console.log('1 document updated'); // no matter what 
    res.json(result);
    //res.json(users);
    }catch(error){
        console.log('status error');
    }
  });


  






app.get('/users-delete', async (req, res) => {
  await User.deleteMany({}).then(() => console.log('Users deleted'));

  res.send('Users deleted \n');
});

app.get('/', (req, res) => {
  res.send('Hello from Node.js app');
});

// start server
// -----------------------
app.listen(port, function () {
  console.log('Running on port 5000!');
 // connectDb().then(() => console.log('MongoDb connected'));
});


