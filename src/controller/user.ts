import { NextFunction, Request, Response } from "express";

export default {

    list: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                context: { db },
                query: params
            } = req;
            console.log('query params', params);
            const users = db.query('list_users', [
                params['page'],
                params['limit']
            ]);
            console.log('users', users);
            res.json(users);
        } catch (error) { next(error); }
    }
};