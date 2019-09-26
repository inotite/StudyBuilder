export interface ApiError {
    code: string;
    message: string;
    target: string;
    details: ApiError[];
}
