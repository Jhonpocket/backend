import express from "express"//
import mysql from "mysql" // Allows the use of MySQL DB
import cors from "cors"// allows to connect the api with reac

const app = express()// conect the data base with the api

const db = mysql.createConnection({// Data information to make the conection.
    host:"localhost",
    user:"root",
    password:"root123",
    database:"dailyaccbd",
})


const users = [{
    correo: "test@functiona.com",
    contrasena: "123",
    },
    ]
// If there is a auth problem

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'R@dioactiva123';

app.use(express.json())
app.use(cors())

// get of the api, allows to validate information

app.get("/", (req,res)=>{
    res.json("Connected to backend!")
})

app.get("/daily", (req,res)=>{
    const q = "SELECT * FROM daily"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// get api for registros

app.get("/registros", (req,res)=>{
    const q = "SELECT * FROM registros"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

//post of the appi, allows to create information on the db.

app.post ("/daily", (req,res) =>{
    if (req.body.action === 'registro'){
    const q = "INSERT INTO daily (`nombre`,`apellido`,`correo`,`contrasena`) VALUES (?)"
    const values = [
     req.body.nombre,
     req.body.apellido,
     req.body.correo,
     req.body.contrasena,   
    ]

    db.query(q, [values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("User has been created successfullly.")
    })
    } else if (req.body.action === 'login'){
        const sql = "SELECT * FROM daily WHERE correo = ? AND contrasena = ?";

        db.query(sql, [req.body.correo, req.body.contrasena], (err, data) =>{
            if(err) return res.json("Error");
            if(data.length > 0) {
                return res.json("Login Successfully")
            } else {
                return res.json("No Record")
            }
        })
    }
    
})

//allows to create a registry on the db.

app.post ("/registros", (req,res) =>{
    const q = "INSERT INTO registros (`valor`,`tipo`,`fecha`,`comentario`) VALUES (?)"
    const values = [
     req.body.valor,
     req.body.tipo,
     req.body.fecha,
     req.body.comentario,   
    ]

    db.query(q, [values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("The registry has been created successfullly.")
    })
})

// delete information of the db.

app.delete("/registros/:idReg", (req,res)=>{
    const regId = req.params.idReg;
    const q = "DELETE FROM registros WHERE idReg = ?";

    db.query(q, [regId], (err, data) =>{
        if(err) return res.json(err)
        return res.json("The entry has been deleted successfullly.")
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
        return res.json("User has been updated successfullly.")
    })
})
// port of conexion.
app. listen(8800, ()=>{
    console.log("Connected to backend!")
})