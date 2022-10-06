import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 3381,
    username: 'postgres',
    password: 'password',
    database: 'law_firm_db',
    logging: true
});
