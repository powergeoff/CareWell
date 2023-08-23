
using CareWell.Core.Infrastructure.Models;

namespace CareWell.Core.Modules.HomeAddress.GetHomeAddress
{
    public class GetHomeAddressQuery : Query<HomeAddressDbModel>
    {
        public string EpicParameters { get; set; }
    }
}