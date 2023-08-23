using System;
using System.Text;

namespace CareWell.Common.Extensions
{
    public static class ExceptionExtensions
    {
        public static string GetFullExceptionMessage(this Exception self)
        {
            var sb = new StringBuilder();
            sb.Append(self.Message ?? "");

            if (self.InnerException != null)
            {
                sb.Append(Environment.NewLine);
                sb.Append(self.InnerException.GetFullExceptionMessage());
            }

            return sb.ToString();
        }
    }
}
