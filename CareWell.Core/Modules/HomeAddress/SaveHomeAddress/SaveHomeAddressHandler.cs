using CareWell.Common.Utils;
using CareWell.Core.External.Auth;
using CareWell.Core.Infrastructure.Models;
using CareWell.Core.Modules.HomeAddress.GetHomeAddress;
using CareWell.Core.Services;

namespace CareWell.Core.Modules.HomeAddress.SaveHomeAddress
{
    public class SaveHomeAddressHandler : CommandHandler<SaveHomeAddressCommand>
    {
        //private readonly IDatabase _db;
        private readonly IEpicParametersService _epicParametersService;
        private readonly IDirectoryService _directoryService;
        private readonly ILogger<SaveHomeAddressHandler> _logger;

        public SaveHomeAddressHandler(IEpicParametersService epicParametersService, IDirectoryService directoryService, ILogger<SaveHomeAddressHandler> logger)
        {
            //_db = db;
            _epicParametersService = epicParametersService;
            _directoryService = directoryService;
            _logger = logger;
        }
        //public override async Task Handle(SaveHomeAddressCommand model)
        public override Task Handle(SaveHomeAddressCommand model)
        {
            var parameters = _epicParametersService.DecodeParameters(model.EpicParameters);

            if (string.IsNullOrWhiteSpace(parameters?.Login))
                throw BadRequest("Can't find employee information");

            var info = _directoryService.FindUserInfo(parameters.Login, null);

            if (info == null)
                throw BadRequest("Can't find employee information");

            //call sde
            //add encounter along with transaction success
            //empi??
            var record = new HomeAddressDbModel
            {
                UserId = info.Username,
                Csn = parameters.Csn,
                FirstName = info.FirstName,
                LastName = info.LastName,
                Address = model.Address,
                City = model.City,
                ZipCode = model.ZipCode,
                State = model.State,
                Created = DateTimeHelper.Now
            };

            /* try
            {
                await _db.SaveProviderHomeAddress(record);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Database Error");
                throw BadRequest("Database Error");
            } */

            return Task.FromResult(record);
            //call SDE with new epic paramters

        }
    }
}