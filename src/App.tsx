import { Provider } from 'react-redux';
import { store } from './redux/Store';
import { HomeScreen } from './screens/HomeScreen';

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
} 