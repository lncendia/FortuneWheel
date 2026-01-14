using FortuneWheel.Application.Services.CommandHandlers;
using FortuneWheel.Exceptions;
using FortuneWheel.Extensions;
using FortuneWheel.Infrastructure.Storage.DatabaseInitialization;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Регистрируем сервисы логгирования
builder.AddLoggingServices();

// Добавляем сервисы CORS
builder.AddCorsServices();

// Добавляем в приложение сервисы для работы с хранилищами
builder.AddStorageServices();

// Добавляем в приложение сервисы для работы с медиатором
builder.Services.AddMediatorServices(typeof(AddParticipantHandler));

// Регистрация контроллеров с поддержкой сериализации JSON
builder.Services.AddControllers();

// Добавляет сервисы для использования формата сведений о проблеме
builder.Services.AddProblemDetails();

// Добавляем обработчик исключений
builder.Services.AddExceptionHandler<ExceptionHandler>();

// Создаем экземпляр приложения ASP.NET Core
WebApplication app = builder.Build();

// Создаем область для инициализации баз данных
using (IServiceScope scope = app.Services.CreateScope())
{
  // Инициализация начальных данных в базу данных
  await DatabaseInitializer.InitAsync(scope.ServiceProvider);
}

// Преобразует необработанные исключения в ответы с подробной информацией о проблеме
app.UseExceptionHandler();

// Используем статические файлы из wwwroot
app.UseStaticFiles();

// Включение CORS
app.UseCors(CorsServices.CorsPolicy);

// Добавляем в приложение маршрутизацию запросов на контроллеры MVC
app.MapControllers();

// SPA fallback
app.MapFallback(context =>
{
  context.Response.ContentType = "text/html";
  return context.Response.SendFileAsync(Path.Combine(app.Environment.WebRootPath, "index.html"));
});

// Запускаем приложение ASP.NET Core
await app.RunAsync();
