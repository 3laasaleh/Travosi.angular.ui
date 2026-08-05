export interface IGenericResponse<T> {
    isSuccess: boolean;
    statusCode: number,
    message: string,
    data: T,
    exception?:any,
}