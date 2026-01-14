using MediatR;

namespace FortuneWheel.Application.Abstractions.Commands;

public sealed record SetParticipantVisibilityCommand(long Id, bool Visible) : IRequest;
