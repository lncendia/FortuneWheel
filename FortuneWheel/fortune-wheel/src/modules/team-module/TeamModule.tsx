import {type ReactNode, useMemo} from 'react';
import {TeamProvider} from "../../contexts/TeamProvider.tsx";
import {Banner, BannerText, BannerTitle} from "../../UI/banner/banner.ts";
import {UrlExample} from "../../UI/url-example/url-example.ts";

const TeamModule = ({children}: { children: ReactNode }) => {

  const teamName = useMemo(() => {
    const pathname = window.location.pathname;
    return pathname.split('/')[1] || null;
  }, []);

  if (!teamName) {
    const domain = window.location.origin;

    return (
      <Banner>
        <BannerTitle>Команда не указана</BannerTitle>
        <BannerText>
          Укажи имя команды в адресной строке, например:
        </BannerText>
        <UrlExample>
          {domain}/<span>my-team</span>
        </UrlExample>
      </Banner>
    );
  }

  return (
    <TeamProvider team={teamName}>
      {children}
    </TeamProvider>
  );
};

export default TeamModule;
