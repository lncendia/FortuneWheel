import React from 'react';
import type {ParticipantsProps} from './types';
import {Buttons, Item, List, Name} from './Participants.styles';
import {Button} from "../../UI/button/button.ts";

const Participants: React.FC<ParticipantsProps> = ({
                                                     participants,
                                                     onToggleVisibility,
                                                     onRemove,
                                                   }) => {
  return (
    <List>
      {participants.map(participant => {
        const buttonsDisabled = participant.isRemoving || participant.isToggling;
        return (
          <Item
            key={participant.id}
            $color={participant.color}
            $dimmed={!participant.visible}
          >
            <Name>{participant.name}</Name>

            <Buttons>
              <Button
                $active={participant.visible}
                $loading={participant.isToggling}
                disabled={buttonsDisabled}
                onClick={() => onToggleVisibility(participant.id, !participant.visible)}
              >
                {participant.visible ? 'Виден' : 'Скрыт'}
              </Button>

              <Button
                $danger
                $loading={participant.isRemoving}
                disabled={buttonsDisabled}
                onClick={() => onRemove(participant.id)}
              >
                Удалить
              </Button>
            </Buttons>
          </Item>
        );
      })}
    </List>
  );
};

export default Participants;
