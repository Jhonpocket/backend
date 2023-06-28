import express from "express"
import mysql from "mysql"
import cors from "cors"// allows to connect the api with reac

const app = express()// conect the data base with the api

const db = mysql.createConnection({// Data information to make the conection.
    host:"localhost",
    user:"root",
    password:"R@dioactiva123",
    database:"dailyaccbd",
})

// If there is a auth problem

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'R@dioactiva123';

app.use(express.json())
app.use(cors())
// get of the api, allows to validate information
app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.get("/daily", (req,res)=>{
    const q = "SELECT * FROM daily"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
//post of the appi, allows to create information on the db.
app.post ("/daily", (req,res) =>{
    const q = "INSERT INTO daily (`nombre`,`apellido`,`correo`,`contrasena`) VALUES (?)"
    const values = [
     req.body.nombre,
     req.body.apellido,
     req.body.correo,
     req.body.contrasena,   
    ]

    db.query(q, [values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been created successfullly.")
    })
})
// delete information of the db.
app.delete("/daily/:id", (req,res)=>{
    const dailyId = req.params.id;
    const q = "DELETE FROM daily WHERE id = ?";

    db.query(q, [dailyId], (err, data) =>{
        if(err) return res.json(err)
        return res.json("Book has been deleted successfullly.")
    })
})
// allows to update the information on the db.
app.put("/daily/:id", (req,res)=>{
    const dailyId = req.params.id;
    const q = "UPDATE daily SET `nombre` = ?, `apellido`= ?, `correo` = ?, `contrasena`= ? WHERE id = ?";

    const values=[
     req.body.nombre,
     req.body.apellido,
     req.body.correo,
     req.body.contrasena,       
    ]

    db.query(q, [...values,dailyId], (err, data) =>{
        if(err) return res.json(err)
        return res.json("Book has been updated successfullly.")
    })
})
// port of conexion.
app. listen(8800, ()=>{
    console.log("Connected to backend!")
})