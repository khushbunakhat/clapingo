const mongoose= require('mongoose');
mongoose.set("strictQuery", false);
const DB=process.env.DATABASE
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology: true 
  })
.then(client => {
    console.log('Connected to Database')}).catch((error)=>console.log(error.message))
    