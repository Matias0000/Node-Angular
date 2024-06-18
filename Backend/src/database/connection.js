import sql from 'mssql'
import { DB_DATABASE, DB_PASSWORD, DB_SERVER, DB_USER } from "../config/config.js";

const dbConnect = {
  user:DB_USER||'sass',
  password:DB_PASSWORD||'yourStrong#Password',
  server:DB_SERVER||'localhost',
  database:DB_DATABASE||'webstore',
  options:{
    encrypt:false,
    trustServerCertificate:true,
  }

}

export const getConnection = async ()=>{
  try{
    const pool = await sql.connect(dbConnect)

    // const result = await pool.request().query("SELECT GETDATE()")
    // console.log(result);
    return pool
  }
  catch(error){
    console.log(error);
  }

}