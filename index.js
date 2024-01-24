const express = require('express');
const server = express();
let numberarray = [1,2,3,4,5]
server.get("/",(req,res)=>{
    res.json(numberarray.toString())
})
server.put("/:numero", (req,res) => {
    console.log(req)
    console.log(req.params.numero)
    numberarray.push(req.params.nemero)
})
server.delete("/:index",(req,res) =>{
    numberarray.splice(req.params,index,1)
    res,json("Elemento Borrado")


})

server.listen(3002,()=>{
    console.log("SERVER IS RUNNING")
})