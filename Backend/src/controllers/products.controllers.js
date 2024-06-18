import { getConnection } from '../database/connection.js'
import  sql  from 'mssql'

//Trae todo los productos de la base de datos
export const getProducts = async (req,res) => {
  try {
    const pool = await getConnection();

    const result = await pool.request().query("SELECT * FROM Products");
    console.log(result)

    res.json(result.recordset)

  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener los productos')
  }
}

//Busqueda de un producto por id
export const getProduct = async (req,res) => {
  // const id = req.params.id
  // console.log(req.params.id)
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('id',sql.Int, req.params.id)
      .query('SELECT * FROM Products WHERE id = @id')

    if(result.rowsAffected[0] === 0){
      return res.status(404).json({message:'Producto no encontrado'})  
    }
  // console.log(result);
  return res.json(result.recordset[0])
  } catch (error) {
    console.log(error)
    res.status(404).send('No se encontro el producto con id ')
  }
  // res.json({})
}

// Creacion de produtos
export const createProducts = async (req,res) => {
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('name', sql.VarChar, req.body.name)
      .input('description', sql.Text, req.body.description)
      .input('price', sql.Decimal, req.body.price)
      .query('INSERT INTO Products (name, description, price) VALUES(@name,@description, @price);SELECT SCOPE_IDENTITY() AS id;')
  // console.log(result);
  // console.log(req.body);
  // res.send("Producto Creado")
  res.json({id:result.recordset[0].id, name: req.body.name, description:req.body.description, price:req.body.price})
    
  } catch (error) {
    console.log(error)
    res.status(404).send('No se encontro el producto con id')
  }
  
}

//Actualizacion de productos
export const updateProducts = async (req,res) => {
  try {
    const pool = await getConnection()
    
    const result = await pool.request()
      .input('ID', sql.Int, req.params.id)
      .input('Name', sql.NVarChar, req.body.name)
      .input('Description', sql.NVarChar, req.body.description)
      .input('Price', sql.Decimal, req.body.price)
      .query('UPDATE Products SET name = @Name, description = @Description, price = @Price WHERE ID = @ID');

    if(result.rowsAffected[0] === 0){
      return res.status(404).json({message:'Producto no encontrado'})  
    }
  // console.log(result);
  return res.json(
    {
      ID:req.params.id,
      Name:req.body.name,
      Description:req.body.description,
      Price:req.body.price
    })
  // return res.json({message:'Producto Actualizado'})
    
  } catch (error) {
    console.log(error)
    res.status(404).send('El producto no se pudo Actualizar ')
  }
}

//Eliminacion de productos
export const deleteProducts = async (req,res) => {
  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input('id',sql.Int, req.params.id)
      .query('DELETE FROM Products WHERE id = @id')

    if(result.rowsAffected[0] === 0){
      return res.status(404).json({message:'Producto no encontrado'})  
    }
  // console.log(result);
  return res.json({message: "Producto Eliminado"})
  } catch (error) {
    console.log(error)
    res.status(404).send('No se encontro el producto con id ')
  }
}
