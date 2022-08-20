const express = require("express");
const app = express();
require("dotenv").config();
require("dotenv-defaults").config();



async function main() {
	await app.listen(Number(process.env.APP_PORT));
	console.log(`Сервер открыт на http://localhost:${process.env.APP_PORT}/`);  
}

main().catch(err => console.error(err));