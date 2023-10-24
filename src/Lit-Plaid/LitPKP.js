import LitJsSdk from '@lit-protocol/lit-node-client-nodejs';

const LIT_NETWORK = "serrano";
const AUTH_SIGNATURE = process.env.authSig_acc2; // Make sure 'authSig_acc2' is defined earlier

const encryptDecryptString = async () => {
    const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
        alertWhenUnauthorized: false,
        litNetwork: LIT_NETWORK,
        debug: true,
    });

    await litNodeClient.connect();

    const { signatures, response, logs } = await litNodeClient.executeJs({
        ipfsId: process.env.IPFS_ID,
        authSig: AUTH_SIGNATURE,
        jsParams: process.env.CLIENT_PARAMS,
    });

    console.log(response);
    console.log(signatures);
    console.log(logs);
}

encryptDecryptString();
