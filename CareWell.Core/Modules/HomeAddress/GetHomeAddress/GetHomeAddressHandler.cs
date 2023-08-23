using CareWell.Core.Infrastructure.Models;
using CareWell.Core.Services;

namespace CareWell.Core.Modules.HomeAddress.GetHomeAddress
{
    public class GetHomeAddressHandler : QueryHandler<GetHomeAddressQuery, HomeAddressDbModel>
    {
        //private readonly IDatabase _db;
        private readonly IEpicParametersService _epicParametersService;

        public GetHomeAddressHandler(IEpicParametersService epicParametersService)
        {
            //_db = db;
            _epicParametersService = epicParametersService;
        }

        public override Task<HomeAddressDbModel> Handle(GetHomeAddressQuery model)
        {
            var parameters = _epicParametersService.DecodeParameters(model.EpicParameters);

            if (string.IsNullOrWhiteSpace(parameters?.Login))
                throw BadRequest("Can't find employee information");

            Task<HomeAddressDbModel> mockResult = Task<HomeAddressDbModel>.Factory.StartNew(() => new HomeAddressDbModel());

            return mockResult;
            //return _db.GetProviderHomeAddressByLogin(parameters?.Login);
        }
    }
}