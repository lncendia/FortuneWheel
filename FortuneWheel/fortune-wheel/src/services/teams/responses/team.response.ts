/** Данные команды */
export interface TeamResponse {
  /** Участники */
  participants: ParticipantResponse[];
}

/** Данные участника */
export interface ParticipantResponse {
  /** Идентификатор участника */
  id: number;
  /** Имя участника */
  name: string;
  /** Видимость участника */
  visible: boolean;
  /** Цвет участника */
  color: string;
}
