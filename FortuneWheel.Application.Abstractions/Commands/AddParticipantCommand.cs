using FortuneWheel.Application.Abstractions.DTOs;

using MediatR;

namespace FortuneWheel.Application.Abstractions.Commands;

public sealed record AddParticipantCommand(string Team, string Name) : IRequest<ParticipantDto>;
