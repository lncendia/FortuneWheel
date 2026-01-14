using FortuneWheel.Application.Abstractions.Entities.Abstractions;

namespace FortuneWheel.Application.Abstractions.Entities;

public class Participant : IVersionedEntity
{
  public long Id { get; init; }
  public long TeamId { get; init; }
  public bool Visible { get; set; }
  public required string Name { get; init; }
  public required string Color { get; init; }
  public int Version { get; set; }
}
