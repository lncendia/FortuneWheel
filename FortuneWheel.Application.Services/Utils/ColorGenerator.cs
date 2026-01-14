namespace FortuneWheel.Application.Services.Utils;

/// <summary>
/// Генератор случайных мягких HSL-цветов.
/// </summary>
public static class ColorGenerator
{
  /// <summary>
  /// Генератор случайных чисел
  /// </summary>
  private static readonly Random _random = new();

  /// <summary>
  /// Максимальное число попыток
  /// </summary>
  private const int MaxAttempts = 100;

  /// <summary>
  /// Получить расстояние между HUE
  /// </summary>
  /// <param name="h1">Первый HUE</param>
  /// <param name="h2">Второй HUE</param>
  /// <returns>Расстояние</returns>
  private static int GetDistance(int h1, int h2)
  {
    int diff = Math.Abs(h1 - h2);
    return Math.Min(diff, 360 - diff);
  }

  /// <summary>
  /// Проверить допустимость HUE
  /// </summary>
  /// <param name="candidateHue">Проверяемый HUE</param>
  /// <param name="existingHues">Существующие HUE</param>
  /// <param name="minDistance">Минимальное расстояние</param>
  /// <returns>Допустим ли</returns>
  private static bool IsValidHue(int candidateHue, List<int> existingHues, int minDistance)
  {
    return existingHues.All(usedHue => GetDistance(candidateHue, usedHue) >= minDistance);
  }

  /// <summary>
  /// Получить минимальный шаг по HUE
  /// </summary>
  /// <param name="total">Всего использованных</param>
  /// <returns>Шаг</returns>
  private static int GetMinDistance(int total)
  {
    if (total <= 8) return 30;
    if (total <= 13) return 20;
    if (total <= 36) return 10;
    return 5;
  }

  /// <summary>
  /// Извлечь HUE из HSL-строк
  /// </summary>
  /// <param name="used">Список HSL</param>
  /// <returns>Список HUE</returns>
  private static List<int> ExtractHues(IEnumerable<string> used)
  {
    var existingHues = new List<int>();

    foreach (string hsl in used)
    {
      if (string.IsNullOrWhiteSpace(hsl))
        continue;

      int start = hsl.IndexOf('(') + 1;
      int end = hsl.IndexOf(',');
      if (end <= start)
        continue;

      string hueStr = hsl.Substring(start, end - start).Trim();
      if (int.TryParse(hueStr, out int parsedHue) && parsedHue is >= 0 and < 360)
      {
        existingHues.Add(parsedHue);
      }
    }

    return existingHues;
  }

  /// <summary>
  /// Сгенерировать HSL
  /// </summary>
  /// <param name="used">Список HSL</param>
  /// <returns>Новый цвет</returns>
  public static string GenerateHsl(IEnumerable<string> used)
  {
    List<int> existingHues = ExtractHues(used);
    int minDistance = GetMinDistance(existingHues.Count);

    int hue = 0;

    for (int attempt = 0; attempt < MaxAttempts; attempt++)
    {
      hue = _random.Next(0, 360);
      if (IsValidHue(hue, existingHues, minDistance))
        break;
    }

    int saturation = _random.Next(50, 71);
    int lightness = _random.Next(60, 76);
    return $"hsl({hue}, {saturation}%, {lightness}%)";
  }
}
