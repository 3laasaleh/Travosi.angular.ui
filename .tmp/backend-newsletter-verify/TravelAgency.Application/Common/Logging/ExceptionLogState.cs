namespace TravelAgency.Application.Common.Logging
{
    public static class ExceptionLogState
    {
        private const string LoggedKey = "TravelAgency.ExceptionLogged";

        public static bool IsLogged(Exception exception)
            => exception.Data.Contains(LoggedKey);

        public static bool TryMarkLogged(Exception exception)
        {
            if (IsLogged(exception))
                return false;

            exception.Data[LoggedKey] = true;
            return true;
        }
    }
}
