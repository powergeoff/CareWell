

using CareWell.Core.External.USPS;
using CareWell.Core.Modules.HomeAddress.Validate;
using CareWell.Core.Modules.HomeAddress.GetHomeAddress;
using CareWell.Core.Modules.HomeAddress.SaveHomeAddress;

namespace CareWell.Back.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HomeAddressController : ControllerBase
    {
        private readonly IMediator _mediator;

        public HomeAddressController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public Task<USPSValidatedAddress> Validate([FromForm] ValidateAddressQuery model) => _mediator.Send(model);

        [HttpGet]
        public Task<HomeAddressDbModel> GetHomeAddress([FromQuery] GetHomeAddressQuery model) => _mediator.Send(model);

        [HttpPost]
        public Task SaveHomeAddress([FromBody] SaveHomeAddressCommand model) => _mediator.Send(model);


        [HttpGet]
        public List<string> GetValues()
        {
            var ret = new List<string>
            {
                "Heelllooo",
                "World"
            };

            return ret;
        }
    }
}