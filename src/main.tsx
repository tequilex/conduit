import ReactDOM from 'react-dom/client';
import App from './app/App';
import { RootStoreContext } from './app/RootStore.context';
import RootStore from './app/RootStore';
import './app/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RootStoreContext.Provider value={new RootStore()}>
    <App />
  </RootStoreContext.Provider>,
);
