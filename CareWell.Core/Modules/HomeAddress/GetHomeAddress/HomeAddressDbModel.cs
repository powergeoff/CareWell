namespace CareWell.Core.Modules.HomeAddress.GetHomeAddress;

public class HomeAddressDbModel
{
    public string UserId { get; set; } = "gao0";
    public string Csn { get; set; } = "whatever";
    public string FirstName { get; set; } = "Joe";
    public string LastName { get; set; } = "Blow";
    public string Address { get; set; } = "8 Glade Ave Apt 1";
    public string City { get; set; } = "Boston";
    public string State { get; set; } = "MA";
    public string ZipCode { get; set; } = "02130";
    public DateTime Created { get; set; } = DateTime.Now;

}