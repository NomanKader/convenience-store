import { NextResponse } from 'next/server';
import mysql from 'mysql';

export async function GET(req, res) {
  console.log("Request",req);
  const dbConfig = {
    host: process.env.DB_HOST_NAME,
    user: 'a9a6b3_store',
    password: 'hnin@123',
    database: 'db_a9a6b3_store',
  };

  const pool = mysql.createPool(dbConfig);

  try {
    const results = await new Promise((resolve, reject) => {
      pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    console.log(results);
    return  NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.error('Error executing query:', error);
    return  NextResponse.json({ error: error.message }, { status: 500 });
  }
}
