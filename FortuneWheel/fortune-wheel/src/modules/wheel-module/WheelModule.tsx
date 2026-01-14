import Wheel from "../../components/wheel/Wheel.tsx";
import {useCallback, useMemo, useState} from "react";
import {useTeam} from "../../contexts/useTeam.ts";
import type {Participant} from "../../contexts/TeamProvider.tsx";
import Container from "../../UI/container/Container.tsx";
import MenuButton from "../../UI/menu-button/MenuButton.tsx";
import styled from "styled-components";
import {Button} from "../../UI/button/button.ts";
import {Banner, BannerText, BannerTitle} from "../../UI/banner/banner.ts";

export const MenuButtonContainer = styled.div`
  position: absolute;
  right: 12px;
  z-index: 1;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20%;
  margin-top: 30px;
`;

const WheelModule = ({onOpen}: { onOpen: () => void }) => {
  const {participants} = useTeam();

  const initRotation = useMemo(() => {
    const count = participants.filter(p => p.visible).length;
    return count ? 360 / count / 2 : 0;
  }, [participants]);

  const [rotation, setRotation] = useState(initRotation);
  const [selected, setSelected] = useState<Participant | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prizeHistory, setPrizeHistory] = useState<Set<Participant>>(new Set());

  const visibleParticipants = useMemo(
    () =>
      participants
        .filter(p => p.visible)
        .filter(p => !prizeHistory.has(p)),
    [participants, prizeHistory]
  );

  const handleReset = useCallback(() => {
    setRotation(initRotation);
    setSelected(null);
    setPrizeHistory(new Set());
  }, [initRotation]);

  const handleSpin = useCallback(() => {
    if (!visibleParticipants.length) return;

    let prizes = visibleParticipants;

    if (selected) {
      if (prizes.length === 1) {
        handleReset();
        return;
      }

      prizes = prizes.filter(p => p !== selected);
      setPrizeHistory(prev => new Set(prev).add(selected));
    }

    const randomIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[randomIndex];

    const fullRotations = prizes.length === 1 ? 1 : 6;
    const prizeSlice = 360 / prizes.length;
    const targetAngle =
      360 * fullRotations + randomIndex * prizeSlice + prizeSlice / 2;

    setSelected(prize);
    setIsSpinning(true);
    setRotation(targetAngle);
  }, [handleReset, selected, visibleParticipants]);

  const handleSpinCompleted = useCallback(() => {
    setRotation(prev => prev % 360);
    setIsSpinning(false);
  }, []);

  return (
    <Container>
      <MenuButtonContainer>
        <MenuButton onClick={onOpen} disabled={isSpinning}/>
      </MenuButtonContainer>

      {visibleParticipants.length === 0 ? (
        <Banner>
          <BannerTitle>Нет видимых участников</BannerTitle>
          <BannerText>
            Как минимум один участник должен быть видимым
          </BannerText>
        </Banner>
      ) : (
        <>
          <Wheel
            prizes={visibleParticipants}
            selectedPrize={selected}
            rotation={rotation}
            isSpinning={isSpinning}
            onSpinComplete={handleSpinCompleted}
          />

          <ButtonsContainer>
            <Button disabled={isSpinning} onClick={handleSpin}>
              Вращать
            </Button>
            <Button disabled={isSpinning || selected == null} onClick={handleReset}>
              Восстановить
            </Button>
          </ButtonsContainer>
        </>
      )}
    </Container>
  );
};

export default WheelModule;
