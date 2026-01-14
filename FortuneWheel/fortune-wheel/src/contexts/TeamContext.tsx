import {createContext} from "react";
import type {Participant} from "./TeamProvider.tsx";

export type TeamContextValue = {
  participants: Participant[];
  team: string;
  setParticipants: (participants: Participant[]) => void;
  addParticipant: (participant: Participant) => void;
  removeParticipant: (id: number) => void;
  updateParticipant: (
    id: number,
    updater: (prev: Participant) => Participant
  ) => void;
};

export const TeamContext = createContext<TeamContextValue | null>(null);
