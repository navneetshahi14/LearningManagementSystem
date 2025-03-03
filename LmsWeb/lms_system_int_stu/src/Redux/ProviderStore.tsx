'use client'

import {store} from '@/Redux/store'
import { Provider } from 'react-redux'

export const ProviderStore = ({children}:{children:React.ReactNode}) =>{
    return <Provider store={store} >{children}</Provider>
}