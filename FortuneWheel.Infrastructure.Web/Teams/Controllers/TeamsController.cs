using FortuneWheel.Application.Abstractions.Commands;
using FortuneWheel.Application.Abstractions.DTOs;
using FortuneWheel.Application.Abstractions.Queries;
using FortuneWheel.Infrastructure.Web.Teams.InputModels;

using MediatR;

using Microsoft.AspNetCore.Mvc;

namespace FortuneWheel.Infrastructure.Web.Teams.Controllers;

/// <summary>
/// Контроллер для работы с комментариями к фильмам
/// </summary>
/// <param name="mediator">Mediator для обработки CQRS запросов</param>
[ApiController]
[Route("api/teams/{team}")]
public class TeamsController(ISender mediator) : ControllerBase
{
  /// <summary>
  /// Получить комментарии к фильму
  /// </summary>
  /// <param name="team">Идентификатор фильма</param>
  /// <param name="token">Токен для отмены операции</param>
  /// <returns>Список комментариев с информацией о пагинации</returns>
  [HttpGet]
  public async Task<TeamDto> GetTeam(string team, CancellationToken token = default)
  {
    var query = new GetTeamQuery(team);
    return await mediator.Send(query, token);
  }

  /// <summary>
  /// Добавить новый комментарий к фильму
  /// </summary>
  /// <param name="team">Идентификатор фильма</param>
  /// <param name="model">Данные нового комментария</param>
  /// <param name="token">Токен для отмены операции</param>
  /// <returns>Созданный комментарий</returns>
  [HttpPost("participants")]
  public async Task<ParticipantDto> AddParticipant(string team, [FromBody] AddParticipantInputModel model,
    CancellationToken token = default)
  {
    var command = new AddParticipantCommand(team, model.Name!);
    return await mediator.Send(command, token);
  }

  /// <summary>
  /// Добавить новый комментарий к фильму
  /// </summary>
  /// <param name="team">Идентификатор фильма</param>
  /// <param name="id"></param>
  /// <param name="token">Токен для отмены операции</param>
  /// <returns>Созданный комментарий</returns>
  [HttpDelete("participants/{id:long}")]
  public async Task RemoveParticipant(string team, long id, CancellationToken token = default)
  {
    var command = new RemoveParticipantCommand(id);
    await mediator.Send(command, token);
  }

  /// <summary>
  /// Установить видимость участника
  /// </summary>
  /// <param name="team">Идентификатор команды</param>
  /// <param name="id">Идентификатор участника</param>
  /// <param name="model">Данные видимости</param>
  /// <param name="token">Токен отмены</param>
  [HttpPatch("participants/{id:long}/visibility")]
  public async Task SetParticipantVisibility(string team, long id, [FromBody] SetParticipantVisibilityInputModel model,
    CancellationToken token = default)
  {
    var command = new SetParticipantVisibilityCommand(id, model.Visible);
    await mediator.Send(command, token);
  }
}
