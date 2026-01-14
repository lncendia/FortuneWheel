import ParticipantsModule from "../modules/participants-module/ParticipantsModule.tsx";
import WheelModule from "../modules/wheel-module/WheelModule.tsx";
import {useState} from "react";
import TeamModule from "../modules/team-module/TeamModule.tsx";
import LoadModule from "../modules/load-module/LoadModule.tsx";

const WheelPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <TeamModule>
      <LoadModule>
        {!menuOpen && <WheelModule onOpen={() => setMenuOpen(true)}/>}
        {menuOpen && <ParticipantsModule onClose={() => setMenuOpen(false)}/>}
      </LoadModule>
    </TeamModule>
  );
};

export default WheelPage;
