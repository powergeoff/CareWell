namespace CareWell.Back.Middleware.SpaIndex;

public static class SpaIndexExtension
{
    public static IApplicationBuilder UseSpaIndex(this IApplicationBuilder builder) => builder.UseMiddleware<SpaIndexMiddleware>();
}
