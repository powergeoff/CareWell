using CareWell.Core.External.USPS;
using CareWell.Core.Infrastructure.Models;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace CareWell.Core.Modules.HomeAddress.Validate
{
    public class ValidateAddressHandler : QueryHandler<ValidateAddressQuery, USPSValidatedAddress>
    {
        private readonly IUSPSValidationService _uspsValidationService;

        public ValidateAddressHandler(IUSPSValidationService uspsValidationService)
        {
            _uspsValidationService = uspsValidationService;
        }

        public async override Task<USPSValidatedAddress> Handle(ValidateAddressQuery model)
        {
            var ret = await _uspsValidationService.ValidateAddress(model);
            if (ret == null)
            {
                throw BadRequest("Bad Address Entered");
            }
            return ret;
        }
    }
}
