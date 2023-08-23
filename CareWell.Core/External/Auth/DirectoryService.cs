using Novell.Directory.Ldap;
using CareWell.Core.Services;

namespace CareWell.Core.External.Auth
{
    public interface IDirectoryService
    {
        bool ValidateUser(string username, string password);
        bool IsUserLocked(string login);
        DirectoryUserInfo FindUserInfo(string username, string employeeNumber);
    }
    public class DirectoryService : IDirectoryService
    {
        private readonly ILogger<DirectoryService> _logger;
        private readonly IConfigService _config;

        public DirectoryService(ILogger<DirectoryService> logger, IConfigService config)
        {
            _logger = logger;
            _config = config;
        }

        public DirectoryUserInfo FindUserInfo(string username, string employeeNumber)
        {
            try
            {
                var attribute = "employeeNumber";
                var value = employeeNumber;

                if (!string.IsNullOrWhiteSpace(username))
                {
                    username = username.Trim();
                    attribute = username.Contains("@") ? "mail" : "cn";
                    value = username;
                }

                using (var connection = GetLdapConnection(_config.LdapServer, _config.LdapPort, _config.ServiceUser, _config.ServicePassword))
                {
                    var data = SearchData(connection, "dc=entdir,dc=partners,dc=org", attribute, value);

                    return data == null ? null : new DirectoryUserInfo
                    {
                        Username = data.GetValueOrDefault("cn")?.FirstOrDefault(),
                        EmployeeNumber = data.GetValueOrDefault("employeeNumber")?.FirstOrDefault(),
                        FirstName = data.GetValueOrDefault("givenName")?.FirstOrDefault(),
                        LastName = data.GetValueOrDefault("sn")?.FirstOrDefault(),
                        Email = data.GetValueOrDefault("mail")?.FirstOrDefault(),
                    };
                }
            }
            catch (LdapException e)
            {
                _logger.LogError(e, $"Error when try to get information about user ({username})");
            }
            return null;
        }

        public bool IsUserLocked(string login)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(login))
                    login = login.Trim();

                using (var connection = GetLdapConnection(_config.LdapHost, _config.LdapPort, _config.ServiceUser, _config.ServicePassword))
                {
                    var baseValues = connection.Read("DC=partners,DC=org");
                    var lockoutDurationString = baseValues?.GetAttribute("lockoutDuration")?.StringValue;
                    var lockoutDuration = long.TryParse(lockoutDurationString, out var lockoutDurationValue)
                        ? Math.Abs(lockoutDurationValue)
                        : 3_000_000_000;//5min
                    var result = SearchData(connection, "cn=users,dc=partners,dc=org", "cn", login);
                    var lockoutTimeString = result?.GetValueOrDefault("lockoutTime")?.FirstOrDefault();
                    var lockoutTime = long.TryParse(lockoutTimeString, out var lockoutTimeValue) ? lockoutTimeValue : 0;

                    return lockoutTime + lockoutDuration > DateTime.UtcNow.ToFileTime();
                }
            }
            catch (LdapException e)
            {
                _logger.LogError(e, $"Error when try to get information about user ({login})");
            }
            return true;
        }

        public bool ValidateUser(string username, string password)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(username))
                    username = username.Trim();

                using (var connection = GetLdapConnection(_config.LdapHost, _config.LdapPort, username, password))
                    return true;
            }
            catch (LdapException e)
            {
                _logger.LogError(e, $"Error when try to validate user ({username})");
            }
            return false;
        }

        private ILdapConnection GetLdapConnection(string server, int port, string user, string password)
        {
            var connection = new LdapConnection { SecureSocketLayer = true };
            connection.Connect(server, port);
            connection.Bind($"cn={user},cn=users,dc=partners,dc=org", password);

            if (!connection.Bound)
                throw new Exception($"Can't login to LDAP lookup service (login: {user})");
            return connection;
        }

        public Dictionary<string, string[]> SearchData(ILdapConnection connection, string directory, string searchAttribute, string value)
        {
            var attrs = new string[] { "*", "+" };
            var filter = $"(&({searchAttribute}={value}))";
            var result = connection.Search(directory, LdapConnection.ScopeSub, filter, attrs, false)?.ToList();
            var item = result?.FirstOrDefault(x =>
                string.Equals(x?.GetAttribute(searchAttribute)?.StringValue, value, StringComparison.InvariantCultureIgnoreCase));
            return item?.GetAttributeSet()?.ToDictionary(x => x.Key, x => x.Value?.StringValueArray);
        }
    }

}
