const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articuloManofacturadoSchema = new Schema({
  tiempoDeCoccion: Number,
  nombre: String,
  precio: Schema.Types.Decimal128,
  detalle: [
    {
      cantidad: Schema.Types.Decimal128,
      articulo: { type: Schema.Types.ObjectId, ref: "articulo" }
    }
  ]
});

articuloManofacturadoSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.precio = parseFloat(ret.precio);
    ret.detalle = ret.detalle.map(d => {
      return { cantidad: parseFloat(d.cantidad), articulo: d.articulo };
    });
  }
});

const ArticuloManofacturado = mongoose.model(
  "articulomanofacturado",
  articuloManofacturadoSchema
);

module.exports = ArticuloManofacturado;
