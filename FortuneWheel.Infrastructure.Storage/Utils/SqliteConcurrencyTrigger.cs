namespace FortuneWheel.Infrastructure.Storage.Utils;

/// <summary>
/// Генератор SQL-триггеров для автоматического инкремента поля Version
/// на таблицах SQLite при обновлении.
/// </summary>
public static class SqliteConcurrencyTrigger
{
  /// <summary>
  /// Генерирует SQL для создания триггера, который увеличивает поле Version
  /// при каждом UPDATE.
  /// </summary>
  /// <param name="tableName">Название таблицы.</param>
  /// <param name="versionColumn">Название колонки для версии (по умолчанию "Version").</param>
  /// <returns>SQL-скрипт для migrationBuilder.Sql()</returns>
  public static string GenerateCreateTrigger(string tableName, string versionColumn = "Version")
  {
    string triggerName = $"update_{tableName.ToLower()}_version";
    return $"""
            CREATE TRIGGER {triggerName}
            AFTER UPDATE ON {tableName}
            BEGIN
                UPDATE {tableName}
                SET {versionColumn} = {versionColumn} + 1
                WHERE rowid = NEW.rowid;
            END;
            """;
  }

  /// <summary>
  /// Генерирует SQL для удаления триггера.
  /// </summary>
  /// <param name="tableName">Название таблицы.</param>
  /// <returns>SQL-скрипт для migrationBuilder.Sql()</returns>
  public static string GenerateDropTrigger(string tableName)
  {
    string triggerName = $"update_{tableName.ToLower()}_version";
    return $"DROP TRIGGER IF EXISTS {triggerName};";
  }
}
