namespace CareWell.Core.External.USPS
{
    public class USPSValidatedAddress
    {
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string ReturnText { get; set; }
    }
}