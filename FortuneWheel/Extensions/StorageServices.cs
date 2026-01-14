using FortuneWheel.Application.Abstractions.Storage;
using FortuneWheel.Infrastructure.Storage;
using FortuneWheel.Infrastructure.Storage.Contexts;

using Microsoft.EntityFrameworkCore;

namespace FortuneWheel.Extensions;

///<summary>
/// Статический класс сервисов хранилища.
///</summary>
public static class StorageServices
{
    /// <summary>
    /// Расширяющий метод для регистрации сервисов хранилища в коллекции служб.
    /// Метод настраивает зависимости для работы с базами данных, файловым хранилищем и другими компонентами системы.
    /// </summary>
    /// <param name="builder">Построитель веб-приложений и сервисов.</param>
    public static void AddStorageServices(this WebApplicationBuilder builder)
    {
        // Получаем строку подключения к базе данных
        string database = builder.Configuration.GetRequiredValue<string>("ConnectionStrings:Database");

        // Добавляем контекст базы данных
        builder.Services.AddDbContext<ApplicationDbContext>(opt => { opt.UseSqlite(database); });

        // Добавляем сервис для работы с единицей работы
        builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
    }
}
