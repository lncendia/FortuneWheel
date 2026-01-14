import {useContext} from "react";
import {TeamContext, type TeamContextValue} from "./TeamContext.tsx";

export const useTeam = (): TeamContextValue => {
  const context = useContext(TeamContext);

  if (!context) {
    throw new Error('useParticipants must be used within TeamProvider');
  }

  return context;
};
