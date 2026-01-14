using FortuneWheel.Infrastructure.Storage.Contexts;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace FortuneWheel.Infrastructure.Storage.DatabaseInitialization;

/// <summary>
/// Класс для инициализации начальных данных в базу данных
/// </summary>
public static class DatabaseInitializer
{
  /// <summary>
  /// Асинхронная инициализация базы данных с начальными данными.
  /// </summary>
  /// <param name="scopeServiceProvider">Провайдер сервисов для создания области видимости.</param>
  /// <returns>Задача, представляющая асинхронную операцию.</returns>
  public static async Task InitAsync(IServiceProvider scopeServiceProvider)
  {
    ApplicationDbContext context = scopeServiceProvider.GetRequiredService<ApplicationDbContext>();
    await context.Database.MigrateAsync();
  }
}
