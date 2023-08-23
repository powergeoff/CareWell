using CareWell.Core.Infrastructure.Services;
using Microsoft.AspNetCore.WebUtilities;
using System.Web;

namespace CareWell.Core.Services
{
    public class EpicParameters
    {
        public string Login { get; set; }
        public string SiteFromEpic { get; set; }
        public string ActivityFromEpic { get; set; }
        public string Csn { get; set; }
    }

    public interface IEpicParametersService
    {
        EpicParameters DecodeParameters(string data);
    }
    public class EpicParametersService : IEpicParametersService
    {
        private readonly IConfigService _config;
        private readonly ICypherService _cypherService;

        public EpicParametersService(IConfigService config, ICypherService cypherService)
        {
            _config = config;
            _cypherService = cypherService;
        }

        public EpicParameters DecodeParameters(string data)
        {
            if (string.IsNullOrWhiteSpace(data))
                return null;

            var decodedUrl = _config.IsDecryptedEpicParameter ? _cypherService.DecryptEpicParameters(data, "P@RTN3RS3PIC2019") : data;

            if (HttpUtility.ParseQueryString(decodedUrl).AllKeys.Length == 0)
                return null;

            var query = QueryHelpers.ParseQuery(decodedUrl);
            return new EpicParameters
            {
                Login = query.TryGetValue("userid", out var userid) ? (string)userid : string.Empty,
                SiteFromEpic = query.TryGetValue("site", out var site) ? (string)site : string.Empty,
                ActivityFromEpic = query.TryGetValue("activity", out var activity) ? (string)activity : string.Empty,
                Csn = query.TryGetValue("csn", out var csn) ? (string)csn : string.Empty

            };
        }
    }
}