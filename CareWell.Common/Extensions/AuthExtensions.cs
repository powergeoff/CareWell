using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace CareWell.Common.Extensions
{
    public static class AuthExtensions
    {
        public static string Get(this ClaimsPrincipal self, string claimTypeName)
        {
            return self?.FindFirst(x => x.Type == claimTypeName)?.Value;
        }

        public static List<string> GetAll(this ClaimsPrincipal self, string claimTypeName)
        {
            return self?.FindAll(x => x.Type == claimTypeName)?.Select(x => x.Value).ToList() ?? new List<string>();
        }
    }
}
