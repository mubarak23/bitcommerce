import { DetailedError } from "../utils/error-response-types";

export interface IServerResponse<T>{
    status: boolean;
    message?: string;
    data?: T;
    error?: string;
    errors?: DetailedError[]
}