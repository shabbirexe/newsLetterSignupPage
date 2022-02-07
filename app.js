const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//Using bod-parser
app.use(bodyParser.urlencoded({extended:true}));
//The public folder which holds the CSS
app.use(express.static("public"));
//Listening on port 3000 and if it goes well then logging a message saying that the server is running
app.listen(process.env.PORT||3000,function () {
 console.log("Server is running at port 3000");
});
//Sending the signup.html file to the browser as soon as a request is made on localhost:3000
app.get("/", function (req, res) {
 res.sendFile(__dirname + "/signup.html");
});
//Setting up MailChimp
mailchimp.setConfig({
 apiKey: "",

 server: ""
});
//As soon as the sign in button is pressed execute this
app.post("/", function (req,res) {

const firstName = req.body.Fname;
const secondName = req.body.Lname;
const email = req.body.Email;

const listId = "679c4a7980";
//Creating an object with the users data
const subscribingUser = {
 firstName: firstName,
 lastName: secondName,
 email: email
};
//Uploading the data to the server
 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});
//If all goes well logging the contact's id
 res.sendFile(__dirname + "/success.html")
 console.log(
`Successfully added contact as an audience member. The contact's id is ${
 response.id
 }.`
);
}
 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});
app.post("/failure",function(req,res){
  res.redirect("/")
});

