const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shortid = require('shortid');

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://srijaanaparthy:12345@cluster0.6e0vh.mongodb.net/fooddata?retryWrites=true&w=majority",
{
    useNewUrlParser : true,
    useUnifiedTopology : true,
})

var foodSchema = new mongoose.Schema
(
    {
        _id : {type : String, default : shortid.generate},
        title : String,
        img : String,
        price : String,
        restaurant : String,
        info : String
    }
)

var fooddata = mongoose.model('item',foodSchema);

app.get("/api/getdata",function(req,res)
{
    fooddata.find({},function(err,data)
    {
        console.log("mydata",data);
        if(!err)
        {  // console.log(data)
            res.send(data);
        }
    })
})

// app.post("/api/items",async (req,res) =>
// {
//     console.log(req.body,"req body ......")
//     const newItem = new fooddata(req.body)
//     console.log(req.body,"req body")
//     const savedItem = await newItem.save();
//     res.send(savedItem)
// })

app.post("/api/addData", async (req, res) => {
    console.log(req.body, 'req.body');
    var newRec = new fooddata({
      title : req.body.title,
      img : req.body.img,
      price : req.body.price,
      restaurant : req.body.restaurant,
      info : req.body.info
    });
    await newRec.save(function (err, newRecord) {
      if (err) {
        console.log(err);
      } else {
        res.send(newRecord);
      }
    });
  });

app.delete("/api/delete/:id",async (req,res) =>
{   
    const deleteItem = await fooddata.findByIdAndDelete(req.params.id)
    res.send(deleteItem)
})

const port = process.env.PORT  || 5000;
app.listen(port,()=> console.log("Server at http://localhost:5000"))