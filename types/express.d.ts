import { IDB } from "../src/database"

export {}

declare global {
    namespace Express {
        export interface Request {
            context: {
                db: IDB,
                user: Object
            }
        }
    }
}