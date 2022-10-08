const options = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'A1b2c3isma456',
        database: 'nuevo'
    }
    
}

const options2 = {
    
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: { filename: './ecommerce/ecommerce.sqlite3' }
}

export { options, options2};