import React from 'react';

function MyModal({ closeModal })
{
    return (
            <div className="modal_background">
                <div className="modal_container">
                    <button onClick={() => closeModal(false)}>x</button>
                
                </div>
            </div>
        );
}

export default MyModal;