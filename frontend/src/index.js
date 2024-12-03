import ReactDOM from 'react-dom';
import { FutureConfigProvider } from 'react-router';
import App from './App';

ReactDOM.render(
  <FutureConfigProvider v7_startTransition v7_relativeSplatPath>
    <App />
  </FutureConfigProvider>,
  document.getElementById('root')
);
