using FortuneWheel.Application.Abstractions.Commands;
using FortuneWheel.Application.Abstractions.Entities;
using FortuneWheel.Application.Abstractions.Exceptions;
using FortuneWheel.Application.Abstractions.Storage;

using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FortuneWheel.Application.Services.CommandHandlers;

public sealed class RemoveParticipantHandler(IUnitOfWork uow) : IRequestHandler<RemoveParticipantCommand>
{
  public async Task Handle(RemoveParticipantCommand request, CancellationToken ct)
  {
    Participant? participant = await uow
      .Query<Participant>()
      .FirstOrDefaultAsync(p => p.Id == request.Id, ct);

    if (participant is null)
      throw new ParticipantNotFoundException(request.Id);

    await uow.DeleteAsync(participant, ct);
    await uow.SaveChangesAsync(ct);
  }
}
