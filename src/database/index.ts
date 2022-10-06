import { NextFunction, Request, Response } from 'express';
import { DataSource } from 'typeorm';
import datasource from './connection';

export interface IDB {
    query<T>(func: string, params?: Array<any>): Promise<T>;
    exec<T>(proc: string, params?: Array<any>): Promise<T>;
}

class DB implements IDB {

    constructor(private connection: DataSource) {}

    query = async (func: string, params?: Array<any>) => await this.request('SELECT', func, params);

    exec = async (proc: string, params?: Array<any>) => await this.request('CALL', proc, params);

    private async request(invoke: string, method: string, params: Array<any> = []) {
        const bindings = params.map((_, index) => `${index + 1}`).join();
        const statement = `${invoke} ${method} (${bindings})`;
        const result = await this.connection.query(statement, params);
        return result;
    }
}

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        await datasource.connect();
        req.context = Object.assign(req.context || {}, {
            db: new DB(datasource)
        });
        res.on('close', async () => await datasource.destroy());
        next();
    } catch (error) { next(error); }
}