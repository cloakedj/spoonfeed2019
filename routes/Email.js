const nodemailer = require('nodemailer');
const otp = Math.floor(100000 + Math.random() * 900000);
var transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
        user: 'SpoonFeed2019@gmail.com',
        pass: 'webtechlabrocks'
    }
});

const mailOptions = {
  from: 'SpoonFeed@gmail.com',
  to: 'kanwardhananjaysingh0545@gmail.com', 
  subject: 'Subject of your email', 
  html: `        
  <div class="container" style="height: 400px;
  width: 100%;
  font-family: 'Franklin Gothic Medium';
  box-shadow: 0px -1px 9px -1px black;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  padding: 2%;">
  <div class="heading" style="color: antiquewhite;
  background: black;
  border-radius: 4px;
  margin-left:40%;
  transform:translateX(-50%);
  width: 20%;
  font-size: 2rem;
  text-align: center;
  margin-bottom:5%;">OTP</div>
  <hr>
  <div class="headings" style="text-align: justify">
  <h2 style="text-align: center;color:purple">SpoonFeed</h2>  
  <h4 style="text-align: center;color:purple">Like It Spoon It, Hate It Fork It.</h4>  
  </div>
  <hr>
  <div class="otp" style="text-align: center;font-family: 'Franklin Gothic Medium'">
  <h1 style="letter-spacing: 12px;">${otp}</h1>
  </div>
  <br><br>
  <div class="note" style="text-align: justify;color:purple">
      <p><b>NOTE: </b> Use the above given 6 digit OTP to complete your registration width
      SpoonFeed. Do Not Share Your OTP with anyone. Have fun with SpoonFeed. See You Soon!</p>
  </div>
  </div>
  <div class="footer" style="font-family: 'Franklin Gothic Medium';color:#fff;background:black;width:100%;height:60px;
  box-shadow: 0px -1px 9px -1px black;
  text-align: center;
  border-bottom-left-radius: 7px;
  padding-top:3%;
  border-bottom-right-radius: 7px;">All Rights Reserved SpoonFeed</div>`
};

transporter.sendMail(mailOptions, function (err, info) {
if(err)
    console.log(err)
else
    console.log(info);
 });

 module.exports = otp;