
using System.Xml.Serialization;

namespace CareWell.Core.External.USPS;

[XmlRoot("AddressValidateResponse")]
public class USPSXMLResponse
{
    [XmlElement(ElementName = "Address")]
    public XMLAddress Address { get; set; }
}

[XmlRoot("Address")]
public class XMLAddress
{

    [XmlElement(ElementName = "Address2")]
    public string Address2 { get; set; }


    [XmlElement(ElementName = "City")]
    public string City { get; set; }


    [XmlElement(ElementName = "State")]
    public string State { get; set; }


    [XmlElement(ElementName = "Zip5")]
    public string Zip5 { get; set; }


    [XmlElement(ElementName = "Zip4")]
    public string Zip4 { get; set; }


    [XmlElement(ElementName = "ReturnText")]
    public string ReturnText { get; set; }
}