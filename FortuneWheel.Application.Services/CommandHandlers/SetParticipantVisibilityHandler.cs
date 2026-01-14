using FortuneWheel.Application.Abstractions.Commands;
using FortuneWheel.Application.Abstractions.Entities;
using FortuneWheel.Application.Abstractions.Exceptions;
using FortuneWheel.Application.Abstractions.Storage;

using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FortuneWheel.Application.Services.CommandHandlers;

public sealed class SetParticipantVisibilityHandler(IUnitOfWork uow) : IRequestHandler<SetParticipantVisibilityCommand>
{
  public async Task Handle(SetParticipantVisibilityCommand request, CancellationToken ct)
  {
    Participant? participant = await uow
      .Query<Participant>()
      .FirstOrDefaultAsync(p => p.Id == request.Id, ct);

    if (participant is null)
      throw new ParticipantNotFoundException(request.Id);

    participant.Visible = request.Visible;
    await uow.SaveChangesAsync(ct);
  }
}
