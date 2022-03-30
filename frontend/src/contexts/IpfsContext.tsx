import { GossipSub } from 'libp2p-gossipsub'
   
import { createContext, useContext, useEffect, useState } from 'react';

import { IPFS, create } from "ipfs-core"
import  { FC } from 'react';

export interface IPFSConnectionProviderProps {
    ipfsClient: IPFS
    type: "native" | "http";
}

export const IPFSConnectionProvider: FC<{}> = (props) => {
    const { children } = props
    const [id, setId] = useState(null);
    const [ipfs, setIpfs] = useState(null);
    const [version, setVersion] = useState(null);
    const [isOnline, setIsOnline] = useState(false);
  
    useEffect(() => {
      const init = async () => {
        if (ipfs) return
        const ipfsNode = await create({repo: `ok ${Math.random()}`});
        const nodeId = await ipfsNode.id();
        const nodeVersion = await ipfsNode.version();
        const nodeIsOnline = ipfsNode.isOnline();
  
        setIpfs(ipfsNode);
        setId(nodeId.id);
        setVersion(nodeVersion.version);
        setIsOnline(nodeIsOnline);
      }
  
      init()
    }, [ipfs]);

    return <IPFSConnectionContext.Provider value={{ ipfsClient: ipfs }}>{children}</IPFSConnectionContext.Provider>;
};
export interface IPFSConnectionContextState {
    ipfsClient: IPFS;
}

export const IPFSConnectionContext = createContext<IPFSConnectionContextState>({} as IPFSConnectionContextState);

export function useIPFSConnection(): IPFSConnectionContextState {
    return useContext(IPFSConnectionContext);
}