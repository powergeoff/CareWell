using CareWell.Core.Models.Config;
using Microsoft.Extensions.Configuration;
using System.Text.Json;

namespace CareWell.Core.Services;

public interface IConfigService
{
    JsonSerializerOptions JsonSettings { get; }
    string AppVersion { get; }
    string ConnectionString { get; }
    bool IsDecryptedEpicParameter { get; }
    ExternalServicesConfigModel ExternalServices { get; }
    string ServiceUser { get; }
    string ServicePassword { get; }
    string LdapHost { get; }
    string LdapServer { get; }
    int LdapPort { get; }
}

public class ConfigService : IConfigService
{
    public JsonSerializerOptions JsonSettings { get; } =
        new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            DictionaryKeyPolicy = JsonNamingPolicy.CamelCase
        };
    private readonly Microsoft.Extensions.Configuration.IConfiguration _config;

    public ConfigService(IConfiguration config)
    {
        _config = config;
    }

    public string ConnectionString => _config.GetSection("Connections").GetValue<string>("Default");
    public string AppVersion => _config.GetValue<string>("AppVersion");
    public bool IsDecryptedEpicParameter => _config.GetValue<bool>("IsDecryptedEpicParameter");

    public ExternalServicesConfigModel ExternalServices =>
        _config.GetSection("ExternalServices").Get<ExternalServicesConfigModel>();

    public string ServiceUser => _config.GetValue<string>("ServiceUser");
    public string ServicePassword => _config.GetValue<string>("ServicePassword");
    public string LdapHost => _config.GetValue<string>("LdapHost");
    public string LdapServer => _config.GetValue<string>("LdapServer");
    public int LdapPort => _config.GetValue<int>("LdapPort");

}
