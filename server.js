// @ts-ignore
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const items = require('./routes/api/items.js');
const users = require('./routes/api/users.js');
const auth = require('./routes/api/auth.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const PORT = process.env.PORT || 5000;

//database config
// @ts-ignore
const db = require('./config/keys').mongoURI;

//connect to mongoDB
mongoose.connect(db,{ useUnifiedTopology: true,useNewUrlParser:true,useCreateIndex:true })
.then(()=>console.log('MongoDB connected'))
.catch(err => console.log(err));

//use routes
app.use('/api/items',items);
app.use('/api/users',users);
app.use('/api/auth',auth);

//serve static assets in production
if(process.env.NODE_ENV==='production')
{
	app.use(express.static('client/build'));

	app.get('*',(req,res)=>{
		res.sendFile(path.resolve(__dirname,'client','build','index.html'));
	});
}

app.listen(PORT,()=>{
    console.log(`server is running on port no. ${PORT}`);
})