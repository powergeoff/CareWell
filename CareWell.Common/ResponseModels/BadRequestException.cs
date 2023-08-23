using System;

namespace CareWell.Common.ResponseModels
{
    public class BadRequestException : Exception
    {
        public BadRequestException(string message) : base(message)
        {
        }
    }
}
