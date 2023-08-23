using System;

namespace CareWell.Common.ResponseModels
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string message) : base(message)
        {
        }
    }
}
