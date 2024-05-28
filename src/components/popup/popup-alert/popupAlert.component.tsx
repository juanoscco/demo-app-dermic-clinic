import React from 'react';

interface Props {
    message: string;
    type: any;
    isOpen: any;
    onClose: any
}

const Popup = ({ message, type, isOpen, onClose }: Props) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div className={`bg-white p-4 rounded shadow-md border ${type === 'error' ? 'border-red-500' : 'border-green-500'}`}>
                <p className={`text-${type === 'error' ? 'red' : 'green'}-500`}>{message}</p>
                <button className="text-sm text-gray-500 hover:text-gray-700 mt-2" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default Popup;
