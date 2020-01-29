import React from 'react';
import TopBarButton from './TopBarButton';
import IconMoon from './IconMoon';
import IconSun from './IconSun';

interface TopBarThemeProps {
  appTheme: srm.Theme;
  setAppTheme(theme: srm.Theme): void;
}

const TopBarTheme = (props: TopBarThemeProps) => {
  const { appTheme, setAppTheme } = props;
  const toggleTheme = () => {
    switch(appTheme) {
      case 'light':
        setAppTheme('dark');
        break;
      case 'dark':
        setAppTheme('light');
        break;
    }
  };
  return (
    <div className='c-topbar__control'>
      <TopBarButton
        onClick={toggleTheme}
        className='c-topbar__button--theme'
        icon={
          appTheme === 'dark'
          ? <IconMoon />
          : <IconSun />
        } />
    </div>
  );
}

export default TopBarTheme;