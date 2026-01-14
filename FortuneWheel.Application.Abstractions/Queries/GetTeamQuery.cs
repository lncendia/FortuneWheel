using FortuneWheel.Application.Abstractions.DTOs;

using MediatR;

namespace FortuneWheel.Application.Abstractions.Queries;

public sealed record GetTeamQuery(string Team) : IRequest<TeamDto>;
