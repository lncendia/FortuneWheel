import {
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import {TeamContext} from './TeamContext';

export type Participant = {
  id: number;
  name: string;
  color: string;
  visible: boolean;
};

export const TeamProvider = ({team, children}: { team: string, children: ReactNode }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const addParticipant = useCallback((participant: Participant) => {
    setParticipants(prev => [...prev, participant]);
  }, []);

  const removeParticipant = useCallback((id: number) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateParticipant = useCallback(
    (id: number, updater: (prev: Participant) => Participant) => {
      setParticipants(prev =>
        prev.map(p =>
          p.id === id
            ? updater(p)
            : p
        )
      );
    },
    []
  );

  return (
    <TeamContext.Provider
      value={{
        team,
        participants,
        setParticipants,
        addParticipant,
        removeParticipant,
        updateParticipant,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};
