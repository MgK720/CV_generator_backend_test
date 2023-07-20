const express = require('express')
const app = express()
const session = require('express-session')
const methodOverride = require('method-override')
const passport = require('passport');
const bodyParser = require('body-parser')
const upload_img = require('./api/upload_img')
const db = require('./api/create')
const dbUpdate = require('./api/update')
const { getCv } = require('./api/get');
const { deleteCv } = require('./api/delete');
const {register} = require('./api/login_register/register');
require('./api/login_register/login')(passport);
const {searchBySkillLike} = require('./api/search');
const { loggedIn, goHome, cvOwnership, isOwner, hasCvAlready, hasCv } = require('./api/login_register/middlewares');

const port = 3000

app.use(session({
  secret: 'thatsecretthinggoeshere',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true})); 
app.use(methodOverride('_method'))
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.use( function( req, res, next ) { //for anchor tag _method
  if ( req.query._method == 'DELETE' ) {
      req.method = 'DELETE';
      req.url = req.path;
  }else if(req.query._method == 'POST'){
      req.method = 'POST';
      req.url = req.path;
  }      
  next(); 
});
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});


app.get("/home",(req,res)=>{
  res.render("home/home.ejs");
})
app.get('/account',loggedIn, async (req,res)=>{
  console.log(1);
  res.render("account/account.ejs", {hasCv: await hasCv(req)});
})
app.get("/",loggedIn,hasCvAlready, (req, res) => {
  res.render('index', {outputData : 0});
  });
app.get("/login",goHome, (req,res) =>{
  res.render('login_register/login.ejs', {msg: 0});
})
app.post("/login",goHome, passport.authenticate("local-login", { failureRedirect: '/login' }), (req, res) => {
  //res.json({ user: req.user });
  res.redirect('/');
}
);
app.get("/register",goHome, (req,res)=>{
  res.render('login_register/register.ejs', {msg : 0});
})
app.post("/register",goHome, (req,res)=>{
  register(req,res);
})
app.post('/logout',loggedIn, function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
app.get('/rules', (req,res)=>{
  res.render('login_register/rules.ejs')
})
app.get("/cv/:id",cvOwnership, (req, res) => {
  try{
    getCv(req, res, 'get_cv/get_cv');
  }catch(e){
    console.log(e);
  }
});
app.get('/cv/:id/update',loggedIn,isOwner, (req, res) => {
  try{
    getCv(req, res, 'index');
  }catch(e){
    console.log(e);
  }
});

app.post('/cv',loggedIn, upload_img.uploadFile, async (req, res) =>{
  if(!req.body.personaldata_id){
    if(await hasCv(req) == false){
      db.createCv(req,res);
    }else{
      res.redirect('/talentfinder')//redirect to home page
    }
  }else{
    dbUpdate.updateCv(req,res);
  }
  
})
app.delete('/cv/:id/delete',loggedIn,isOwner, (req,res)=>{
  deleteCv(req,res);
});

app.get('/talentfinder', (req,res)=>{
  res.render('talent_finder/talent_finder.ejs')
})
app.get('/talentfinder/search', (req,res)=>{
  searchBySkillLike(req,res);
})

app.get('*', (req,res) => {
  res.render('confirm_generation/confirm', {
            cvID: -1,
            msg: 'The requested URL was not found on this server',
            errorUpdate: false,
            errorDelete: false
        });
}) 

app.listen(port, () => {
      console.log(`App running on port ${port}.`)
})



