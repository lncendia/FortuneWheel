using FortuneWheel.Application.Abstractions.Commands;
using FortuneWheel.Application.Abstractions.DTOs;
using FortuneWheel.Application.Abstractions.Entities;
using FortuneWheel.Application.Abstractions.Storage;
using FortuneWheel.Application.Services.Utils;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace FortuneWheel.Application.Services.CommandHandlers;

public sealed class AddParticipantHandler(IUnitOfWork uow) : IRequestHandler<AddParticipantCommand, ParticipantDto>
{
  public async Task<ParticipantDto> Handle(AddParticipantCommand request, CancellationToken ct)
  {
    Team? team = await uow.Query<Team>()
      .Include(t => t.Participants)
      .FirstOrDefaultAsync(t => t.Name == request.Team, cancellationToken: ct);

    if (team == null)
    {
      team = new Team { Name = request.Team };
      await uow.AddAsync(team, ct);
    }

    var participant = new Participant
    {
      Name = request.Name,
      Visible = true,
      Color = ColorGenerator.GenerateHsl(team.Participants.Select(p => p.Color))
    };

    team.Participants.Add(participant);

    await uow.SaveChangesAsync(ct);
    return new ParticipantDto(participant.Id, participant.Name, participant.Color, participant.Visible);
  }
}
