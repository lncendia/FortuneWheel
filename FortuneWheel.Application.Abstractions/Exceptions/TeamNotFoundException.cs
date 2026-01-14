namespace FortuneWheel.Application.Abstractions.Exceptions;

/// <summary>
/// Исключение, которое вызывается, когда не удается найти комментарий.
/// </summary>
public class TeamNotFoundException : Exception
{
  /// <summary>
  /// Идентификатор комментария, который не был найден.
  /// </summary>
  public string Team { get; }

  /// <summary>
  /// Конструктор исключения.
  /// </summary>
  /// <param name="team">Идентификатор комментария.</param>
  public TeamNotFoundException(string team) : base($"Team {team} not found.")
  {
    Team = team;
  }
}
