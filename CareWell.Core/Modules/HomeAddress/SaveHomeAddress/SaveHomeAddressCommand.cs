using CareWell.Core.Infrastructure.Models;

namespace CareWell.Core.Modules.HomeAddress.SaveHomeAddress
{
    public class SaveHomeAddressCommand : Command
    {
        public string EpicParameters { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }

    }

}


