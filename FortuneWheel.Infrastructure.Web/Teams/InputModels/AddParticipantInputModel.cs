using System.ComponentModel.DataAnnotations;

namespace FortuneWheel.Infrastructure.Web.Teams.InputModels;

public class AddParticipantInputModel
{
  [Required(ErrorMessage = "Имя обязательно")]
  [StringLength(200, MinimumLength = 2, ErrorMessage = "Имя должно быть от 2 до 200 символов")]
  public string? Name { get; init; }
}
