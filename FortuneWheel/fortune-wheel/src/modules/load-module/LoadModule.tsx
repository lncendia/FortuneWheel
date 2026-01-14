import {type ReactNode, useEffect, useState} from 'react';
import {teamsApi} from "../../services/teams/teams.api.instance.ts";
import {useTeam} from "../../contexts/useTeam.ts";
import {Banner, BannerText, BannerTitle} from "../../UI/banner/banner.ts";
import AddParticipantModule from "../add-participant-module/AddParticipantModule.tsx";

const LoadModule = ({children}: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const {team, participants, setParticipants} = useTeam()

  useEffect(() => {
    teamsApi.getTeam(team)
      .then(r => {
        setParticipants(r.participants);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setParticipants, team])

  if (loading) {
    return (
      <Banner>
        <BannerTitle>Загрузка...</BannerTitle>
        <BannerText>
          Пожалуйста, дождитесь окончания загрузки
        </BannerText>
      </Banner>
    )
  }

  if (participants.length === 0) {
    return (
      <Banner>
        <BannerTitle>Нет участников</BannerTitle>
        <BannerText>
          Добавьте участника
        </BannerText>
        <AddParticipantModule/>
      </Banner>
    )
  }

  return children;
};

export default LoadModule;
