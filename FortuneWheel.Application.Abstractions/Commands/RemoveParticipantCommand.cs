using MediatR;

namespace FortuneWheel.Application.Abstractions.Commands;

public sealed record RemoveParticipantCommand(long Id) : IRequest;
