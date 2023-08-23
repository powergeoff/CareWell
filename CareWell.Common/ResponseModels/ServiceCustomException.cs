using System;
namespace CareWell.Common.ResponseModels
{
    public class ServiceCustomException : Exception
    {
        public ServiceCustomException(string message) : base(message)
        {
        }
    }
}
