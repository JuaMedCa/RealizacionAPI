const conexion = require("express");
const bodyParser = require('body-parser');
const app = conexion();
const cors = require("cors");
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Json = [
    {id: 1, marca: "Honda", modelo: ["civic", "accord", "CRV", "HRV"], matricula:["1222","12313"], precio:[300000,232323], ano:["2024"]},
    {id: 2, marca: "Toyota", modelo: ["supra", "camry", "corrolla", "tacoma"],  matricula:["1222","12313"], precio:[300000,232323],ano:["2025"]},
    {id: 3, marca: "Monda", modelo: ["3", "4", "5", "6"], matricula:["1222","12313"], precio:[300000,232323],ano:["2026"]}
]

app.use(cors(
    {
        origin: "*",
        methods: ['GET','POST', 'PUT', 'DELETE']
    }
));


app.get("/",(req,res )=> {
    res.json(Json);
})

app.get("/honda", (req, res)=> {
    res.json(Json[0]);
})

app.get("/honda/modelos", (req, res)=> {
    res.json(Json[0].modelo);
})
app.get("/honda/matricula", (req, res)=> {
    res.json(Json[0].matricula);
})

app.get("/honda/precio", (req, res)=> {
    res.json(Json[0].precio);
})


// POST: Crear un nuevo elemento
app.post("/", (req, res) => {
    // Asumimos que los datos del nuevo elemento están en el cuerpo de la solicitud (req.body)
    const nuevoElemento = req.body;
    Json.push(nuevoElemento);
    res.json({ message: "Elemento creado correctamente", nuevoElemento });
});

// PUT: Actualizar un elemento existente por marca
app.put("/:marca", (req, res) => {
    const marca = req.params.marca.toLowerCase();
    const indice = Json.findIndex(item => item.marca.toLowerCase() === marca);
    if (indice !== -1) {
        // Asumimos que los datos actualizados están en el cuerpo de la solicitud (req.body)
        const datosActualizados = req.body;
        Json[indice] = { ...Json[indice], ...datosActualizados };
        res.json({ message: "Elemento actualizado correctamente", elementoActualizado: Json[indice] });
    } else {
        res.status(404).json({ error: "Marca no encontrada" });
    }
});

// DELETE: Eliminar un elemento por marca
app.delete("/:marca", (req, res) => {
    const marca = req.params.marca.toLowerCase();
    const indice = Json.findIndex(item => item.marca.toLowerCase() === marca);
    if (indice !== -1) {
        const elementoEliminado = Json.splice(indice, 1);
        res.json({ message: "Elemento eliminado correctamente", elementoEliminado });
    } else {
        res.status(404).json({ error: "Marca no encontrada" });
    }
});



app.listen(port, ()=>console.log("servidor encendido en puerto: " + port))