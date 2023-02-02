import * as mysql from "mysql2/promise";

export const pool = mysql.createPool({
    host: 'localhost',
    database: 'mega_ads',
    user: 'root',
    password: 'root',
    namedPlaceholders: true,
    port: 8889,
    decimalNumbers: true
});