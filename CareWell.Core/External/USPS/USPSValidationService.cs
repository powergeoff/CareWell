using System.Net.Http;
using System.Text.RegularExpressions;
using System.Xml.Linq;
using System.Xml.Serialization;
using CareWell.Core.Services;
using CareWell.Core.Modules.HomeAddress.Validate;
using System.Web;

namespace CareWell.Core.External.USPS
{
    public interface IUSPSValidationService
    {
        Task<USPSValidatedAddress> ValidateAddress(ValidateAddressQuery address);
    }
    public class USPSValidationService : IUSPSValidationService
    {

        private readonly IConfigService _config;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<USPSValidationService> _logger;
        public USPSValidationService(IConfigService config, IHttpClientFactory httpClientFactory, ILogger<USPSValidationService> logger)
        {
            _config = config;
            _httpClientFactory = httpClientFactory;
            _logger = logger;
        }
        public async Task<USPSValidatedAddress> ValidateAddress(ValidateAddressQuery model)
        {
            var streetAndUnit = model.Address + " " + HttpUtility.UrlEncode(model.Unit); //unit needs to be URL Encoded when passed from the client

            var userId = _config.ExternalServices.USPSUserId; //"86MASSG85A753"; //add to secrets

            XDocument xml = new XDocument(
                new XElement("AddressValidateRequest",
                    new XAttribute("USERID", userId),
                    new XElement("Revision", "1"),
                    new XElement("Address",
                        new XAttribute("ID", "0"),
                        new XElement("Address1"),
                        new XElement("Address2", streetAndUnit),
                        new XElement("City", model.City),
                        new XElement("State", model.State),
                        new XElement("Zip5"),
                        new XElement("Zip4", model.ZipCode)
                    )
                )
            );
            USPSValidatedAddress ret = new USPSValidatedAddress();
            var url = _config.ExternalServices.USPSValidationUrl + xml;
            try
            {
                var client = _httpClientFactory.CreateClient();
                string responseBody = await client.GetStringAsync(url);

                var serializer = new XmlSerializer(typeof(USPSXMLResponse));
                var response = (USPSXMLResponse)serializer.Deserialize(new StringReader(responseBody));

                //if we don't get back the 9 digit zip - get out
                if (String.IsNullOrEmpty(response.Address.Zip4))
                {
                    _logger.LogError($"Unable to validate with USPS url: {url}");
                    return null;
                }
                ret.Address = response.Address.Address2;
                ret.ReturnText = response.Address.ReturnText;
                ret.City = response.Address.City;
                ret.State = response.Address.State;
                ret.ZipCode = response.Address.Zip5 + "-" + response.Address.Zip4;
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Unable to validate with USPS url: {url}");
                return null;
            }

            return ret;
        }
    }
}