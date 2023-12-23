const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const Details = require('./model/model');
require('./database/config');
const port = process.env.PORT || 6500;
// home file 
const static_path = path.join(__dirname, '../views');
// obtaining partials files
const partials_path = path.join(__dirname, '../views/partials');
app.set('view engine', 'hbs');
app.set('views', static_path);
// to obtained default file of public
app.use('/public', express.static(path.join(__dirname, "../public")));
// using a bootstrap
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
// accessing the partials containning files
hbs.registerPartials(partials_path);
app.use(express.urlencoded({extended : false }));

app.get('/', (req, res)=>{
    res.render("home" ,{ lnLogged: false, username: null });
})

app.post('/contactdata', async(req, res)=>{
    try {
        const username = req.body.user;
        const email = req.body.email;
        const msg= req.body.msg;
        const contactSave = new Details.contactuserData({
            name: username,
            email: email,
            message : msg
        });
        const saveData = await contactSave.save();
        if(saveData){
            res.render('home');
        }
    } catch (error) {
        res.status(401).send(error)
    }

})
app.post('/useraccount', async(req, res)=>{
    try {
        const{
            name, email, phone, password, cpassword
        } = req.body;
        const usersave = new Details.userdetail({
            name: name,
            email: email,
            phone: phone,
            password: password,
            cpassword: cpassword
        })
        // Check if passwords match
        if (password !== cpassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }
        const saveuser = await usersave.save();
        if(usersave){
            res.render("home",{ lnLogged: true, username: name });
        }
    } catch (error) {
        res.status(401).send(error);
        
    }
})
app.listen(port, ()=>{
    console.log(`${port} is running`);
})