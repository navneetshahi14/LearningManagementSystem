import React,{ReactNode} from "react"
import {Provider} from "react-redux"
import {store } from "../redux/store"


interface ProviderProp {
    children:ReactNode
}

export function Providers({children}:ProviderProp){
    return <Provider store={store} >{children}</Provider>
}