import '@/styles/globals.css'
import { AuthNavigator } from '@/ui/components/navigation'

export default function App({ Component, pageProps }) {
  return (
    true?
      <Component pageProps={pageProps}/>
      :
      <AuthNavigator 
        Component={Component}
        pageProps={pageProps}
      />
  )
}