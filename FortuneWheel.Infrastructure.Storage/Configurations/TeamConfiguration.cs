using FortuneWheel.Application.Abstractions.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FortuneWheel.Infrastructure.Storage.Configurations;

/// <summary>
/// Конфигурация Fluent API для сущности Team.
/// </summary>
public class TeamConfiguration : IEntityTypeConfiguration<Team>
{
  public void Configure(EntityTypeBuilder<Team> builder)
  {
    builder.ToTable("teams");
    builder.HasKey(t => t.Id);

    builder.Property(t => t.Name)
      .IsRequired()
      .HasMaxLength(200);

    builder.Property(c => c.Version)
      .HasDefaultValue(0)
      .IsRowVersion();

    builder.HasIndex(t => t.Name)
      .IsUnique();

    builder.HasMany(t => t.Participants)
      .WithOne()
      .HasForeignKey(p => p.TeamId)
      .OnDelete(DeleteBehavior.Cascade);
  }
}
