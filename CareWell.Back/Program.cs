using System.Data;
using System.Globalization;
using System.Net.Http;
using System.Net;
using System.Threading;
using System.Text;
using NLog.Web;
using NLog;
using CareWell.Back.Middleware.SpaIndex;
using CareWell.Back.Middleware.Cqrs;
using CareWell.Core;
using CareWell.Core.Services;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Extensions.DependencyInjection;
using CareWell.Core.External.USPS;
using CareWell.Core.Infrastructure.Services;
using CareWell.Core.External.Auth;
using CareWell.Back.Middleware;

Thread.CurrentThread.CurrentCulture = CultureInfo.InvariantCulture;
Thread.CurrentThread.CurrentUICulture = CultureInfo.InvariantCulture;
CultureInfo.DefaultThreadCurrentCulture = CultureInfo.InvariantCulture;
CultureInfo.DefaultThreadCurrentUICulture = CultureInfo.InvariantCulture;

var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();

try
{
    logger.Info("Start");
    var builder = WebApplication.CreateBuilder(args);
    builder.Logging.ClearProviders();
    builder.Logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
    builder.Host.UseNLog();

    var config = new ConfigService(builder.Configuration);
    builder.Services.AddSingleton<IConfigService>(config);

    //web
    builder.Services.AddControllers(o =>
    {
        o.OutputFormatters.RemoveType<HttpNoContentOutputFormatter>();
        o.Filters.Add(
            new ResponseCacheAttribute { NoStore = true, Location = ResponseCacheLocation.None }
        );
    });
    builder.Services.AddResponseCompression();
    //builder.Services.AddEndpointsApiExplorer();

    builder.Services.AddMediatR(typeof(Anchor).Assembly);
    builder.Services.AddTransient<IDirectoryService, DirectoryService>();
    builder.Services.AddSingleton<ICypherService, CypherService>();
    builder.Services.AddTransient<IEpicParametersService, EpicParametersService>();



    builder.Services.AddScoped<IUSPSValidationService, USPSValidationService>();


    builder.Services
                .AddHttpClient(string.Empty)
                .ConfigurePrimaryHttpMessageHandler(
                    config =>
                        new HttpClientHandler
                        {
                            AutomaticDecompression =
                                DecompressionMethods.Deflate | DecompressionMethods.GZip
                        }
                );

    var app = builder.Build();

    app.UseSpaIndex();
    app.UseCqrs();
    app.UseStaticFiles();
    app.UseAppVersion();

    app.UseRouting();
    app.MapControllers();

    app.Run();
}
catch (Exception e)
{
    Console.WriteLine(e);
    throw;
}
finally
{
    NLog.LogManager.Shutdown();
}
