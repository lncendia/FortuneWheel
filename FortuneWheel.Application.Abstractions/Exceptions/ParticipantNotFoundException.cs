namespace FortuneWheel.Application.Abstractions.Exceptions;

/// <summary>
/// Исключение, которое вызывается, когда не удается найти фильм.
/// </summary>
public class ParticipantNotFoundException : Exception
{
  /// <summary>
  /// Идентификатор фильма, который не был найден.
  /// </summary>
  public long ParticipantId { get; }

  /// <summary>
  /// Конструктор исключения.
  /// </summary>
  /// <param name="participantId">Идентификатор фильма.</param>
  public ParticipantNotFoundException(long participantId) : base($"Participant with ID {participantId} not found.")
  {
    ParticipantId = participantId;
  }
}
