export const suplementos = [
  {
    id: "1",
    categoria:"cafeina",
    imgPath:"/img/cafeina.jpg",
    producto: "Cafeína 250g",
    descripcion: "La cafeína te ayuda a blah blah lala y a mantener un ajadfjg jiaidjdnf",
    stock: 10,
    precio: 3100
  },
  {
    id: "2",
    categoria:"barra",
    imgPath:"/img/barra.jpg",
    producto: "Barra Protéica Vainilla",
    descripcion: "Dale a tu cuerpo ese shock de energía que necesita a mitad del día con nuestras barras protéicas",
    stock: 10,
    precio: 500
  },
  {
    id: "3",
    categoria:"proteina",
    imgPath:"/img/proteina.jpg",
    producto: "Proteína 250g",
    descripcion: "La proteína te ayuda a aumentar la masa muscular rápidamente mientras que su acción blah blah asjdaskdfsd",
    stock: 10,
    precio: 4800
  },
  {
    id: "4",
    categoria:"vitamina",
    imgPath:"/img/pildora.png",
    producto: "Multivitaminas x30",
    descripcion: "Agregá un suplemento general que cubra todas las necesidades de tu cuerpo en una sola toma",
    stock: 10,
    precio: 2800
  },
  {
    id: "5",
    categoria:"creatina",
    imgPath:"/img/creatina.jpg",
    producto: "Creatina 250g",
    descripcion: "La creatina te mantiene blah y ademas ayuda al músculo a blah blah y reestablece la lalalalala",
    stock: 10,
    precio: 4200
  },
  {
    id: "6",
    categoria:"gel",
    imgPath:"/img/gel.jpeg",
    producto: "Energy Gel Vainilla",
    descripcion: "Nuestro gel es perfecto para llevar a tus actividades y tomarlo en medio de la misma, no produce pesadez y te recupera instantáneamente blah blah",
    stock: 10,
    precio: 600
  },
  {
    id: "7",
    categoria:"carnitina",
    imgPath:"/img/pildora.png",
    producto: "Carnitina x30",
    descripcion: "La cartinina ayuda a tu metabolismo a asimilar mejor la glucosa y libera mayor energía durante los entrenamientos",
    stock: 10,
    precio: 3200
  },
  {
    id: "8",
    categoria:"ultra",
    imgPath:"/img/ultra.jpg",
    producto: "Ultra Mass 250g",
    descripcion: "blah blah no se que mas poner pero es para control de peso",
    stock: 10,
    precio: 3500
  },
  {
    id: "9",
    categoria:"cafeina",
    imgPath:"/img/cafeina.jpg",
    producto: "Cafeína 500g",
    descripcion: "La cafeína te ayuda a blah blah lala y a mantener un ajadfjg jiaidjdnf",
    stock: 10,
    precio: 5500
  },
  {
    id: "10",
    categoria:"barra",
    imgPath:"/img/barra.jpg",
    producto: "Barra Protéica Frutilla",
    descripcion: "Dale a tu cuerpo ese shock de energía que necesita a mitad del día con nuestras barras protéicas",
    stock: 10,
    precio: 500
  },
  {
    id: "11",
    categoria:"barra",
    imgPath:"/img/barra.jpg",
    producto: "Barra Protéica Chocolate",
    descripcion: "Dale a tu cuerpo ese shock de energía que necesita a mitad del día con nuestras barras protéicas",
    stock: 10,
    precio: 500
  }, //HASTA ACA COPIE EN LA BASE DE DATOS
  {
    id: "12",
    categoria:"proteina",
    imgPath:"/img/proteina.jpg",
    producto: "Proteína 500g",
    descripcion: "La proteína te ayuda a aumentar la masa muscular rápidamente mientras que su acción blah blah asjdaskdfsd",
    stock: 10,
    precio: 8000
  },
  {
    id: "13",
    categoria:"vitamina",
    imgPath:"/img/pildora.png",
    producto: "Multivitaminas x60",
    descripcion: "Agregá un suplemento general que cubra todas las necesidades de tu cuerpo en una sola toma",
    stock: 10,
    precio: 4000
  },
  {
    id: "14",
    categoria:"creatina",
    imgPath:"/img/creatina.jpg",
    producto: "Creatina 500g",
    descripcion: "La creatina te mantiene blah y ademas ayuda al músculo a blah blah y reestablece la lalalalala",
    stock: 10,
    precio: 7800
  },
  {
    id: "15",
    categoria:"creatina",
    imgPath:"/img/creatina.jpg",
    producto: "Creatina 1kg",
    descripcion: "La creatina te mantiene blah y ademas ayuda al músculo a blah blah y reestablece la lalalalala",
    stock: 10,
    precio: 1200
  },
  {
    id: "16",
    categoria:"gel",
    imgPath:"/img/gel.jpeg",
    producto: "Energy Gel Frutilla",
    descripcion: "Nuestro gel es perfecto para llevar a tus actividades y tomarlo en medio de la misma, no produce pesadez y te recupera instantáneamente blah blah",
    stock: 10,
    precio: 600
  },
  {
    id: "17",
    categoria:"carnitina",
    imgPath:"/img/carnitina.jpg",
    producto: "Carnitina x60",
    descripcion: "La cartinina ayuda a tu metabolismo a asimilar mejor la glucosa y libera mayor energía durante los entrenamientos",
    stock: 10,
    precio: 6000
  },
  {
    id: "18",
    categoria:"ultra",
    imgPath:"/img/ultra.jpg",
    producto: "Ultra Mass 500g",
    descripcion: "blah blah no se que mas poner pero es para control de peso",
    stock: 10,
    precio: 6000
  },
  {
    id: "19",
    categoria:"proteina",
    imgPath:"/img/proteina.jpg",
    producto: "Proteína 1kg",
    descripcion: "La proteína te ayuda a aumentar la masa muscular rápidamente mientras que su acción blah blah asjdaskdfsd",
    stock: 10,
    precio: 1200
  },
  {
    id: "20",
    categoria:"gel",
    imgPath:"/img/gel.jpeg",
    producto: "Energy Gel Limón",
    descripcion: "Nuestro gel es perfecto para llevar a tus actividades y tomarlo en medio de la misma, no produce pesadez y te recupera instantáneamente blah blah",
    stock: 10,
    precio: 600
  }
  
]

export function getItemById (id){
  return new Promise ((resolve) => {
    resolve(suplementos.find(prod => prod.id === id))
})
}

export function getItemByCategoria (categoria){
  return new Promise ((resolve) => {
        resolve(suplementos.filter(prod => prod.categoria === categoria))
    })
}

export function getProductos (){
    return new Promise((resolve) => (resolve(suplementos)))
}