import Participants from "../../components/participants/Participants.tsx";
import {useTeam} from "../../contexts/useTeam.ts";
import {useCallback, useMemo, useState} from "react";
import Container from "../../UI/container/Container.tsx";
import CloseButton from "../../UI/close-button/CloseButton.tsx";
import {Header, Title} from "../../UI/header/header.ts";
import {teamsApi} from "../../services/teams/teams.api.instance.ts";
import type {Participant} from "../../components/participants/types.ts";
import AddParticipantModule from "../add-participant-module/AddParticipantModule.tsx";

const ParticipantsModule = ({onClose}: { onClose: () => void }) => {

  const {team, participants, updateParticipant, removeParticipant} = useTeam();

  const [removing, setRemoving] = useState<Set<number>>(new Set());
  const [toggling, setToggling] = useState<Set<number>>(new Set());

  const enriched = useMemo(() => {
    return participants.map<Participant>(p => {
      return {
        ...p,
        isToggling: toggling.has(p.id),
        isRemoving: removing.has(p.id),
      }
    })
  }, [participants, removing, toggling]);

  const onToggleVisibility = useCallback(async (id: number, visible: boolean) => {
      setToggling(prev => new Set(prev).add(id));

      try {
        await teamsApi.setParticipantVisibility(team, id, visible);
        updateParticipant(id, p => ({...p, visible: visible}));
      } finally {
        setToggling(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    },
    [team, updateParticipant]
  );

  const onParticipantRemove = useCallback(async (id: number) => {
    setRemoving(prev => new Set(prev).add(id));
    try {
      await teamsApi.removeParticipant(team, id);
      removeParticipant(id);
    } finally {
      setRemoving(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }, [removeParticipant, team])

  return (
    <Container>
      <Header>
        <Title>Участники</Title>
        <CloseButton onClick={onClose}/>
      </Header>
      <Participants
        participants={enriched}
        onToggleVisibility={onToggleVisibility}
        onRemove={onParticipantRemove}/>
      <AddParticipantModule/>
    </Container>
  );
};

export default ParticipantsModule;
