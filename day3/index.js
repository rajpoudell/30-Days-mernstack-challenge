const express = require("express");
const { v4: uuidv4 } = require("uuid"); // Use require() instead of import

const app = express();
const port = 4000;

app.use(express.json());//middleware

const users = [
    { id: "4e93ef35-1e00-40d9-89b2-925deecee072", name: "john" },
    { id: "116e2303-5ceb-4749-8387-dfbf70cc429e", name: "doe" },
    { id: "13a95f61-2214-4d09-90f8-a21ac151b9cc", name: "raj" }
  
];

app.get("/", (req, res) => {
  res.json(users);
  //   res.send(users)
});

app.post("/user", (req, res) => {
  const user = req.body;
  if (!user || !user.name) {
    return res.status(400).send("User data is missing or incomplete");
  } // for checking if the field is empty or not n postman {body raw json format ma }

  const newUser = { id: uuidv4(), ...user };
  users.push(newUser);
  res.send(`User with the name ${newUser.name} added to the database!`);
});

//gettting user with specific id
app.get("/:userid", (req, res) => {
  const {userid} = req.params; 
  const foundUser = users.find((user) => user.id == userid)
  res.send(foundUser);

});

//for this to used users types shouldn't be const

// app.delete("/:deleteId",(req,res) =>{
//     const {deleteId} = req.params; 
//     users = users.filter((user) => user.id !== deleteId)
//     res.send(`userdeleted:` );
// })

app.delete("/:deletingId",(req,res) =>{
    const {deletingId} = req.params;
    const foundUser = users.filter((user) => user.id==deletingId)
   const deletedUser = users.splice(foundUser, 1);
    res.send(` Deleted ${deletedUser[0].name}  from database:`)
});



app.put("/:updating",(req,res) =>{
    const {updating} = req.params;
    const {name} = req.body;
    const user = users.find((user) => user.id === updating);
    if(name){
        user.name = name;
    }  
     res.send(`user with the id ${updating} has been updated`)
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
