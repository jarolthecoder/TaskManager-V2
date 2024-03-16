"use client"
import { ThemeProvider } from '@/context';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';

export const SharedProviders = ({children}) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
