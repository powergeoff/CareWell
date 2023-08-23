using System;

namespace CareWell.Common.ResponseModels
{
    public class ForbiddenException : Exception
    {
        public ForbiddenException(string message) : base(message)
        {
        }
    }
}