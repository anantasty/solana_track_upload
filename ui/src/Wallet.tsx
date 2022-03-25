import React from 'react';
import {
    useAnchorWallet,
    useConnection,
    useWallet,
} from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import TracksView from './TracksView';
import TrackUpload from './TrackUpload.jsx';

const Wallet: React.FC = () => {
    const { connection } = useConnection();
    let walletAddress = "";

    // if you use anchor, use the anchor hook instead
    // const wallet = useAnchorWallet();
    // const walletAddress = wallet?.publicKey.toString();

    const wallet = useWallet();
    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
    }

    return (
        <>
            <div className="header-wrapper">
                <span className="button-wrapper">
                    <WalletModalProvider>
                        <WalletMultiButton />
                    </WalletModalProvider>
                </span>
                {wallet.connected && <WalletDisconnectButton />}
            </div>
            <div className='track-upload'>
                <TrackUpload />
            </div>
            <div>
                <h1>List of Tracks</h1>
                <TracksView connection={connection} userKey={wallet.publicKey}></TracksView> 
            </div>
        </>
    );
};

export default Wallet;
