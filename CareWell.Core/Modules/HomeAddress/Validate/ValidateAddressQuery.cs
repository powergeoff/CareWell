using CareWell.Core.External.USPS;
using CareWell.Core.Infrastructure.Models;

namespace CareWell.Core.Modules.HomeAddress.Validate;

public class ValidateAddressQuery : Query<USPSValidatedAddress>
{
    public string Address { get; set; }
    public string Unit { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
}