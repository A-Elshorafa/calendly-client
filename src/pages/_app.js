import '@/styles/globals.css'
import axios from '../apis/axios';
import { useRouter } from 'next/router'
import RootStore from '@/stores/RootStore';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const rootStore = new RootStore();
  const axiosInstance = new axios(router).instance;
  
  return (
    <Component
      router={router}
      axios={axiosInstance}
      pageProps={pageProps}
      rootStore={rootStore}
    />
  )
}