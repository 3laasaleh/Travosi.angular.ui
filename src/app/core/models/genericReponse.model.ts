export interface IGenericResponseModel<T> {
    isSuccess: boolean;
    statusCode: number,
    message: string,
    data: T,
    exception?:any,
}