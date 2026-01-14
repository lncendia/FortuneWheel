import {useTeam} from "../../contexts/useTeam.ts";
import {useCallback, useMemo} from "react";
import styled from "styled-components";
import {AddParticipantForm} from "../../components/add-participant-form/AddParticipantForm.tsx";
import {teamsApi} from "../../services/teams/teams.api.instance.ts";

const FormContainer = styled.div`
  margin-top: 30px;
`;

const AddParticipantModule = () => {

  const {team, participants, addParticipant} = useTeam();

  const usedNames = useMemo(() => {
    return new Set<string>(participants.map(p => p.name));
  }, [participants]);

  const onParticipantAdd = useCallback(async (name: string) => {
    const participant = await teamsApi.addParticipant(team, name);
    addParticipant(participant);
  }, [addParticipant, team])

  return (
    <FormContainer>
      <AddParticipantForm onAdd={onParticipantAdd} usedNames={usedNames}/>
    </FormContainer>
  );
};

export default AddParticipantModule;
