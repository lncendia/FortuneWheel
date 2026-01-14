using FortuneWheel.Application.Abstractions.Entities.Abstractions;

namespace FortuneWheel.Application.Abstractions.Entities;

public class Team : IVersionedEntity
{
  public long Id { get; init; }
  public required string Name { get; init; }
  public List<Participant> Participants { get; init; } = [];
  public int Version { get; set; }
}
