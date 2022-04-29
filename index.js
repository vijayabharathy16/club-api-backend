const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const mongodbClient = mongodb.MongoClient;

app.use(express.json)
app.use(
    cors({
        origin: "*",
    })
);

const URL = "mongodb+srv://vijay:admin123@cluster0.ni9t3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let users = [];

app.get("/users", function (req, res) {
    res.json(users);
});
 app.post("/create-user", async function (req ,res){
       
     try {
         // 1. connect the DB
        let connection = await mongodbClient.connect(URL);

        //2.Select DB
        let db = connection.db("project")

        //3.select collection
        //4.DO operation

         await db.collection("club-api").insertOne(req.body)

         // 5.close Connection
          await connection.close()

          res.json({message:"User Created in db"})

     } catch (error) {
         res.status(500).json({message:"Something Went wrong"})
     }
 })

app.get("/user/:id", function (req, res) {
    let userIndex = users.findIndex(obj => obj.id == req.params.id)
    if (userIndex !== -1) {
        res.json(users[userIndex])
    } else {
        res.status(404).json({ message: "User not found" })
    }
})
// res.json = (users[userIndex]) 
//    console.log(req.body);
//    res.json({message: "User Created"});
// });


app.put("/edit/:id", function (req, res) {
    let userIndex = users.findIndex(obj => obj.id == req.params.id)
    if (userIndex !== -1) {
        req.body.id = users[userIndex].id;
        users[userIndex] = req.body;
        res.json({ message: "User Updated" })
    } else {
        res.status(404).json({ message: "User not found" })
    }
    req.body.id = users[userIndex].id;
    users[userIndex] = req.body;
    res.json({ message: "User updated" })
})


app.delete("/delete/:id", function (req, res) {
    let userIndex = users.findIndex(obj => obj.id == req.params.id)
    if (userIndex !== -1) {
        users.splice(userIndex, 1)
        // delete users[userIndex]
        res.json({ message: "User Delected" })
    } else {
        res.status(404).json({ message: "User not found" })
    }

})

app.listen(process .env.PORT || 3001);







