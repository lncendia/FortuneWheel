using FortuneWheel.Application.Abstractions.Entities;
using FortuneWheel.Infrastructure.Storage.Configurations;

using Microsoft.EntityFrameworkCore;

namespace FortuneWheel.Infrastructure.Storage.Contexts;

/// <summary>
/// Контекст базы данных для приложения.
/// </summary>
/// <param name="options">Опции конфигурации для DbContext.</param>
public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.ApplyConfiguration(new ParticipantConfiguration());
    modelBuilder.ApplyConfiguration(new TeamConfiguration());

    modelBuilder.Entity<Team>()
      .Navigation(r => r.Participants)
      .AutoInclude();

    base.OnModelCreating(modelBuilder);
  }
}
