import { IUser } from "../model/user.model";

declare module 'some-untyped-package';

declare global{
    namespace Express{
        interface Request{
            user?: IUser | any
        }
    }
}

export {}
