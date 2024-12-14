import 'normalize.css';
import './styles/common.scss';
import 'react-contexify/dist/ReactContexify.css';

import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'styled-components';

import AppContainer from './components/core/AppContainer';
import LoadingScreen from './components/Loading/LoadingScreen';
import i18n, { LanguageResources } from './locales';
import RootRouterProvider from './pages';
import { GlobalStateProvider } from './stores';
import theme from './theme';

function App() {
  return (
    <GlobalStateProvider>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n} defaultNS={LanguageResources.Common}>
          <AppContainer>
            <RootRouterProvider />
          </AppContainer>
        </I18nextProvider>
        <LoadingScreen />
      </ThemeProvider>
    </GlobalStateProvider>
  );
}

export default App;
