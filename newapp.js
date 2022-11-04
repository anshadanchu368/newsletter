

const express=require("express");

const app=express();


const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public"));

const https=require("https");


app.get("/",function(req,res){
    res.sendFile(__dirname+"/style.html");
});

app.post("/",function(req,res){
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;

    const data={
        members: [
            {
                email_address:email,
                status:"subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };

   
    const JsonData=JSON.stringify(data);

    const url="https://us13.admin.mailchimp.com/3.0/lists/347da1b39c";

    const options = {

        method:"POST",
        auth: "anchu1:e0c0bf84a9ee098a2f97689c12e613e9-us13"
    }

    const request= https.request(url,options,function(response){
           response.on("data", function(data){
            console.log(JSON.parse(data));
           })
    })   

    request.write(JsonData);
    request.end();

});



app.listen(3000,function(){
    console.log("server runs at port 3000");
});