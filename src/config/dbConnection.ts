import { createConnection } from "typeorm";

createConnection().then((connection) => {
    console.log('Database connected successfully.')
    
    connection.runMigrations({
        transaction: "all"
    }).then(() => {
        console.log('Migrations run.');
    }).catch((error) => {
        console.log(error);
    });
}).catch((error) => {
    console.log(error);
});