import { createContext, useContext, useEffect, useState } from 'react';

import { IPFS, create } from "ipfs-core"
import { create as httpCreate } from "ipfs-http-client";
import  { FC } from 'react';

const projectId = '26kSkVGBv2Hpojs4LM2Jd97p799';
const projectSecret = '0df8688fa57a9a29392280b3423eca11';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

export interface IPFSConnectionProviderProps {
    ipfsClient: IPFS
    type: "native" | "http";
}

export const IPFSConnectionProvider: FC<{}> = (props) => {
    const { children } = props
    const [id, setId] = useState(null);
    const [ipfs, setIpfs] = useState(null);
    const [nodeType, setNodeType] = useState("")
    const [version, setVersion] = useState(null);
    const [isOnline, setIsOnline] = useState(false);
  
    useEffect(() => {
      const init = async () => {
        if (ipfs) return
        let ipfsNode;
        try{
        ipfsNode = await create({repo: `ok ${Math.random()}`});
        const nodeId = await ipfsNode.id();        
        setId(nodeId.id);        
        setNodeType("Core")
        setIsOnline(ipfsNode.isOnline)        
        } catch (e) {
            ipfsNode = await httpCreate({
                host: 'ipfs.infura.io',
                port: 5001,
                protocol: 'https',
                headers: {
                    authorization: auth,
                },
            });
            setNodeType("http")
        }

        const nodeVersion = await ipfsNode.version();
        setVersion(nodeVersion)
        setIpfs(ipfsNode);
        setVersion(nodeVersion.version);
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