export type Participant = {
  id: number;
  name: string;
  color: string;
  visible: boolean;
  isToggling: boolean;
  isRemoving: boolean;
};

export interface ParticipantsProps {
  participants: Participant[];
  onToggleVisibility: (id: number, visible: boolean) => void;
  onRemove: (id: number) => void;
}
