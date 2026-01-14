using FortuneWheel.Application.Abstractions.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FortuneWheel.Infrastructure.Storage.Configurations;

/// <summary>
/// Конфигурация Fluent API для сущности Participant.
/// </summary>
public class ParticipantConfiguration : IEntityTypeConfiguration<Participant>
{
  public void Configure(EntityTypeBuilder<Participant> builder)
  {
    builder.ToTable("participants");
    builder.HasKey(p => p.Id);

    builder.Property(p => p.Name)
      .IsRequired()
      .HasMaxLength(200);

    builder.Property(p => p.Color)
      .IsRequired()
      .HasMaxLength(50);

    builder.Property(c => c.Version)
      .HasDefaultValue(0)
      .IsRowVersion();

    builder.HasIndex(p => new { p.TeamId, p.Name })
      .IsUnique();
  }
}
