using FortuneWheel.Application.Abstractions.DTOs;
using FortuneWheel.Application.Abstractions.Entities;
using FortuneWheel.Application.Abstractions.Exceptions;
using FortuneWheel.Application.Abstractions.Queries;
using FortuneWheel.Application.Abstractions.Storage;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace FortuneWheel.Application.Services.QueryHandlers;

public sealed class GetTeamHandler(IUnitOfWork uow) : IRequestHandler<GetTeamQuery, TeamDto>
{
  public async Task<TeamDto> Handle(GetTeamQuery request, CancellationToken cancellationToken)
  {
    TeamDto? team = await uow.Query<Team>()
      .Include(t => t.Participants)
      .Where(t => t.Name == request.Team)
      .Select(t => new TeamDto(t.Participants.Select(p => new ParticipantDto(p.Id, p.Name, p.Color, p.Visible)).ToList()))
      .FirstOrDefaultAsync(cancellationToken);

    return team ?? throw new TeamNotFoundException(request.Team);
  }
}
