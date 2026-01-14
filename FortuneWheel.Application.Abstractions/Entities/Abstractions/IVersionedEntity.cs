namespace FortuneWheel.Application.Abstractions.Entities.Abstractions;

public interface IVersionedEntity : IEntity
{
  public int Version { get; set; }
}
