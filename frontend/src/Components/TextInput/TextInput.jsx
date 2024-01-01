import React from 'react';

function TextInput(props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: 'inherit', alignItems: 'center' }}>
            <input
                {...props}
                style={{
                    padding: '18px 30px',
                    margin: '15px',
                    outline: 'none',
                    width: '30%',
                    border: '1px solid #fff',
                    borderRadius: '10px',
                    fontSize: '20px',
                }}
            />
            {props.error && (
                <p
                    style={{
                        color: '#de1b55',
                        textAlign: 'left',
                        width: '30%',
                    }}
                >
                    {props.errorMessage}
                </p>
            )}
        </div>
    );
}

export default TextInput;
