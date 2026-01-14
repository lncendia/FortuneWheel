import type {ParticipantResponse, TeamResponse} from "./responses/team.response.ts";

/** Класс для работы с API команд */
export class TeamsApi {
  /** Базовый URL API */
  private readonly baseUrl: string;

  /**
   * Создает экземпляр TeamsApi
   * @param baseUrl - базовый URL API (например /api)
   */
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Получить команду
   */
  async getTeam(team: string): Promise<TeamResponse> {
    const response = await fetch(
      `${this.baseUrl}/${team}`,
      {
        method: 'GET'
      }
    );

    if (!response.ok)
      throw new Error(response.statusText);

    return response.json();
  }

  /**
   * Добавить участника
   */
  async addParticipant(team: string, name: string): Promise<ParticipantResponse> {
    const response = await fetch(
      `${this.baseUrl}/${team}/participants`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name}),
      }
    );

    if (!response.ok)
      throw new Error(response.statusText);

    return response.json();
  }

  /**
   * Удалить участника
   */
  async removeParticipant(team: string, id: number): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/${team}/participants/${id}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok)
      throw new Error(response.statusText);
  }

  /**
   * Изменить видимость участника
   */
  async setParticipantVisibility(team: string, id: number, visible: boolean): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/${team}/participants/${id}/visibility`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({visible}),
      }
    );

    if (!response.ok)
      throw new Error(response.statusText);
  }
}
