
   
import { createContext, useContext, useEffect, useState } from 'react';

import { IPFS} from "ipfs-core"
import { create } from "ipfs-core";
import  { FC } from 'react';


export interface IPFSConnectionProviderProps {
    ipfsClient: IPFS
    type: "native" | "http";
}

export const IPFSConnectionProvider: FC<{}> = (props) => {
    const { children } = props
    const [ipfsClient, setClient] = useState<IPFS>()

useEffect(() => {
  let active = true
  load()
  return () => { active = false }

  async function load() {
    setClient(undefined) // this is optional
    // const res = await create();
    if (!active) { return }
    //setClient(res)
  }
}, [])

    return <IPFSConnectionContext.Provider value={{ ipfsClient: ipfsClient }}>{children}</IPFSConnectionContext.Provider>;
};
export interface IPFSConnectionContextState {
    ipfsClient: IPFS;
}

export const IPFSConnectionContext = createContext<IPFSConnectionContextState>({} as IPFSConnectionContextState);

export function useIPFSConnection(): IPFSConnectionContextState {
    return useContext(IPFSConnectionContext);
}