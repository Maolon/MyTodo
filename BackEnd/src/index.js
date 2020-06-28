const env = require('dotenv').config();
const SECRECT = process.env.SESSION_SECRET;
if(!SECRECT) SECRECT = require("./SessionSecret");
let express = require("express");
let session = require("express-session");
let bodyParser = require("body-parser");
let app = express();
const login = require('./routers/loginRouter')
const task = require('./routers/taskRouter')

let cors = require('cors')
require('./db');

app.use(express.static('public'))

app.use(cors());
app.use(express.static("public"));
app.use(session({
    secret:SECRECT,
    saveUninitialized: true,
    resave: false
}))

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())
app.use('/', login);
app.use('/',task);

app.listen(4020,()=>{
    console.log('Listening on port 4020');
})