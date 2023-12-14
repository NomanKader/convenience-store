import mysql from 'mysql';
import { NextRequest, NextResponse } from 'next/server';
export  async function GET(req,res){
   return NextResponse.json({name:"Hello World"},{status:200})
}
export async function POST(req,res){
   return NextResponse.json(NextRequest.prototype.body.getReader.prototype,{status:201})
}