namespace FortuneWheel.Application.Abstractions.DTOs;

public sealed record TeamDto(IReadOnlyList<ParticipantDto> Participants);
