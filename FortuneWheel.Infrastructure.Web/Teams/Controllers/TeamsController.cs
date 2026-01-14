using FortuneWheel.Application.Abstractions.Commands;
using FortuneWheel.Application.Abstractions.DTOs;
using FortuneWheel.Application.Abstractions.Queries;
using FortuneWheel.Infrastructure.Web.Teams.InputModels;

using MediatR;

using Microsoft.AspNetCore.Mvc;

namespace FortuneWheel.Infrastructure.Web.Teams.Controllers;

/// <summary>
/// Контроллер для работы с командами и их участниками
/// </summary>
/// <param name="mediator">Mediator для обработки CQRS-команд и запросов</param>
[ApiController]
[Route("api/teams/{team}")]
public class TeamsController(ISender mediator) : ControllerBase
{
  /// <summary>
  /// Получить информацию о команде
  /// </summary>
  /// <param name="team">Идентификатор команды</param>
  /// <param name="token">Токен отмены операции</param>
  /// <returns>Данные команды</returns>
  [HttpGet]
  public async Task<TeamDto> GetTeam(string team, CancellationToken token = default)
  {
    var query = new GetTeamQuery(team);
    return await mediator.Send(query, token);
  }

  /// <summary>
  /// Добавить участника в команду
  /// </summary>
  /// <param name="team">Идентификатор команды</param>
  /// <param name="model">Данные добавляемого участника</param>
  /// <param name="token">Токен отмены операции</param>
  /// <returns>Созданный участник</returns>
  [HttpPost("participants")]
  public async Task<ParticipantDto> AddParticipant(
    string team,
    [FromBody] AddParticipantInputModel model,
    CancellationToken token = default)
  {
    var command = new AddParticipantCommand(team, model.Name!);
    return await mediator.Send(command, token);
  }

  /// <summary>
  /// Удалить участника из команды
  /// </summary>
  /// <param name="team">Идентификатор команды</param>
  /// <param name="id">Идентификатор участника</param>
  /// <param name="token">Токен отмены операции</param>
  [HttpDelete("participants/{id:long}")]
  public async Task RemoveParticipant(string team, long id, CancellationToken token = default)
  {
    var command = new RemoveParticipantCommand(id);
    await mediator.Send(command, token);
  }

  /// <summary>
  /// Изменить видимость участника команды
  /// </summary>
  /// <param name="team">Идентификатор команды</param>
  /// <param name="id">Идентификатор участника</param>
  /// <param name="model">Параметры видимости</param>
  /// <param name="token">Токен отмены операции</param>
  [HttpPatch("participants/{id:long}/visibility")]
  public async Task SetParticipantVisibility(
    string team,
    long id,
    [FromBody] SetParticipantVisibilityInputModel model,
    CancellationToken token = default)
  {
    var command = new SetParticipantVisibilityCommand(id, model.Visible);
    await mediator.Send(command, token);
  }
}
