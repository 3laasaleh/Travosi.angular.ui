
using System.Net;
using System.Text.Json.Serialization;


namespace TravelAgency.Application.DTOs.User
{
    public class GenericResponse<T>
    {
        public bool IsSuccess { get; set; }
        public int StatusCode { get; set; }
        public string? Message { get; set; }
        public T? Data { get; set; }
        [JsonIgnore]
        public Exception? Exception { get; set; }
        public IList<string> Errors { get; set; } = new List<string>();

        public static GenericResponse<T> BadRequest(string message, IEnumerable<string>? errors = null)
        {
            return new GenericResponse<T>
            {
                IsSuccess = false,
                StatusCode = (int)HttpStatusCode.BadRequest,
                Message = message,
                Errors = errors?.ToList() ?? new List<string>()
            };
        }



        public static GenericResponse<T> Success(T data, string message = "Success")
        {
            return new GenericResponse<T>
            {
                IsSuccess = true,
                Data = data,
                Message = message,
                StatusCode = (int)HttpStatusCode.OK

            };
        }

        public static GenericResponse<T> Failure(string message, Exception? exception = null)
        {
            return new GenericResponse<T>
            {
                IsSuccess = false,
                StatusCode = (int)HttpStatusCode.InternalServerError,
                Exception = exception,
                Message = message,

            };
        }

        public static GenericResponse<T> NotFound(string message = "Resource not found")
        {
            return new GenericResponse<T>
            {
                IsSuccess = false,
                StatusCode = (int)HttpStatusCode.NotFound,
                Message = message
            };
        }

        public static GenericResponse<T> Unauthorized(string message = "Unauthorized")
        {
            return new GenericResponse<T>
            {
                IsSuccess = false,
                StatusCode = (int)HttpStatusCode.Unauthorized,
                Message = message
            };
        }





    }
}
