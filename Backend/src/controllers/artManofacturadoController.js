const ArticuloManofacturado = require("./../models/articuloManofacturado");
const DetallePedido = require("./../models/articuloManofacturado");
//User.update( {_id: req.body.email}, { $pull: { favoriteMovies: { id: req.params.id} }
//}, function(err, model){})
// usar pull para eliminar un articulo dentro del objeto art manofacturado.

const getAll = async (req, res) => {
  const articulos = await ArticuloManofacturado.find({})
    .populate("detalle.articulo")
    .exec();
  res.status(200).json(articulos);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const articulo = await ArticuloManofacturado.findById({ _id: id });
  res.status(200).json(articulo);
};

const updateArticuloManofacturado = async (req, res) => {
  const { id } = req.params;
  const articulo = req.body;
  const result = await ArticuloManofacturado.findByIdAndUpdate(id, articulo);
  res.status(200).json({ _id: id, articulo: articulo });
  const io = req.app.get("io");
  io.emit("refreshManofacturado");
};

const deleteArticuloManofacturado = async (req, res) => {
  const { id } = req.params;

  const result = await ArticuloManofacturado.findByIdAndDelete(id);
  res.status(200).json(result);
  const io = req.app.get("io");
  io.emit("refreshManofacturado");
};

const insertArticuloManofacturado = async (req, res) => {
  const data = req.body;
  const artManofacturado = new ArticuloManofacturado(data);
  const newArt = await artManofacturado.save();
  const io = req.app.get("io");
  io.emit("refreshManofacturado");
  res.status(200).json(newArt);
};

module.exports = {
  getAll,
  getOne,
  updateArticuloManofacturado,
  deleteArticuloManofacturado,
  insertArticuloManofacturado
};

// const insertArticuloManofacturado = async (req, res) => {
//   const data = req.body;
//   const artManofacturado = new ArticuloManofacturado(data);
//   artManofacturado.detalle = await ArtDetalle.insertMany(data.detalle);
//   const newArt = await artManofacturado.save();
//   res.status(200).json(newArt);
// };
// para este metodo debo enviar un json como el siguiente
/* {
  "tiempoDeCoccion": 20,
  "nombre": "rodriguez",
  "precio": "1231234234",
  "detalle": [{
    "cantidad": 2,
    "articulo": "5cef2e31eaa3e91b1443c815"
  },{

    "cantidad": 3,
    "articulo": "5cef2e31eaa3e91b1443c815"
  }]
} */
