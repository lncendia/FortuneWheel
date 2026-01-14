using FortuneWheel.Application.Abstractions.Storage;
using FortuneWheel.Infrastructure.Storage.Contexts;

namespace FortuneWheel.Infrastructure.Storage;

/// <summary>
/// Реализация интерфейса IUnitOfWork для работы с базой данных.
/// </summary>
/// <param name="context">Контекст базы данных.</param>
public class UnitOfWork(ApplicationDbContext context) : IUnitOfWork
{
  public IQueryable<T> Query<T>() where T : class
  {
    return context.Set<T>();
  }

  public async Task AddAsync<T>(T entity, CancellationToken cancellationToken = default) where T : class
  {
    await context.Set<T>().AddAsync(entity, cancellationToken);
  }

  public void Update<T>(T entity) where T : class
  {
    context.Set<T>().Update(entity);
  }


  public async Task AddRangeAsync<T>(IEnumerable<T> entities, CancellationToken cancellationToken = default)
    where T : class
  {
    await context.Set<T>().AddRangeAsync(entities, cancellationToken);
  }

  public async Task DeleteAsync<T>(T entity, CancellationToken cancellationToken = default) where T : class
  {
    context.Set<T>().Remove(entity);
    await Task.CompletedTask;
  }

  public async Task DeleteRangeAsync<T>(IEnumerable<T> entities, CancellationToken cancellationToken = default)
    where T : class
  {
    context.Set<T>().RemoveRange(entities);
    await Task.CompletedTask;
  }

  public async Task SaveChangesAsync(CancellationToken cancellationToken = default)
  {
    await context.SaveChangesAsync(cancellationToken);
  }
}
