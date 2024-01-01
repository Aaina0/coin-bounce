
import React from 'react';
import { TailSpin } from 'react-loader-spinner';

function Loader({ text }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 400px)' }}>
            <h2>Loading {text}</h2>
            <TailSpin height={80} width={80} radius={1} color={"#3861fb"} />
        </div>
    );
}

export default Loader;
