const express = require("express")
const morgan = require("morgan")
const db = require('../config/db.js')
const c = console.log



var app = express()
const puerto = 3000

app.use(morgan("dev"))

app.get("/",(peticion,respuesta) =>{
    respuesta.send("<h1>Servidor corriendo exitosamente</h1>")
})


app.post("/ventas",(peticion, respuesta)=>{
    db.conexion.query("select * from venta",(error, resultado, campos)=>{
        if(error) error
        respuesta
        .header('Access-Control-Allow-Origin', '*')
        .send({resultado})
    });
})

//comentario

app.post("/total_de_ventas",(peticion, respuesta)=>{
    db.conexion.query("select * from venta",(error, resultado, campos)=>{
        if(error) error
        respuesta
        .header('Access-Control-Allow-Origin', '*')
        .send({resultado})
    });
})

app.post("/clientes",(peticion, respuesta)=>{
    db.conexion.query("select * from cliente",(error, resultado, campos)=>{
        if(error) throw error
        respuesta
        .header('Access-Control-Allow-Origin', '*')
        .send({data:resultado})
    })
})

app.post("/producto_venta",async (peticion, respuesta)=>{
    try {
        const data = await correrQuery('select * from producto_venta')
        respuesta
        .header('Access-Control-Allow-Origin', '*')
        .send({data:data.resultado})
    } catch (error) {
        console.log(`/producto_venta: ${error}`)   
    }
})


//Solo ejecutar depués de conectar
const correrQuery = (SQLquery) => {
    return new Promise((resolver,reyectar)=>{
        db.conexion.query(SQLquery,(error,resultado,campos)=>{
            resolver({
                error,
                resultado,
                campos
            })
        })
        
    })
}

const metodoPost = (ruta) => {
    return new Promise((resolver,reyectar)=>{
        app.post(ruta,(peticion, respuesta)=>{
            resolver({
                peticion,
                respuesta
            })
        })
    })
}

app.listen(puerto, () => {
    console.log(`Servidor corriendo en puerto ${puerto}`)
})