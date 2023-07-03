const express = require('express')
const bodyParser = require('body-parser')
const upload_img = require('./api/upload_img')
const app = express()
const db = require('./api/create')
const dbUpdate = require('./api/update')
const { getCv } = require('./api/get');
const { deleteCv } = require('./api/delete');
const port = 3000


app.use(bodyParser.json())
app.use(express.urlencoded({extended: true})); 
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.render('index', {outputData : 0});
  });

app.get("/cv/:id",(req, res) => {
  try{
    getCv(req, res, 'get_cv/get_cv');
  }catch(e){
    console.log(e);
  }
});
app.get('/cv/:id/update', (req, res) => {
  try{
    getCv(req, res, 'index');
  }catch(e){
    console.log(e);
  }
});

app.post('/cv', upload_img.uploadFile, (req, res) =>{
  if(!req.body.personaldata_id){
    db.createCv(req,res);
  }else{
    dbUpdate.updateCv(req,res);
  }
  
})
app.get('/cv/:id/delete', (req,res)=>{//TODO - USE DELETE METHOD INSTEAD OF GET - now for just DELETE button on client side
  deleteCv(req,res);
})
app.delete('/cv/:id/delete', (req,res)=>{//TODO - USE DELETE METHOD INSTEAD OF GET - for fetch api
  deleteCv(req,res);
});

app.listen(port, () => {
      console.log(`App running on port ${port}.`)
})



