using System.ComponentModel.DataAnnotations;

namespace FortuneWheel.Infrastructure.Web.Teams.InputModels;

public class SetParticipantVisibilityInputModel
{
  [Required(ErrorMessage = "Значение обязательно")]
  public bool Visible { get; init; }
}
