"use client"
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const alertStyles = {
    success: 'bg-green-100 border-green-400 text-green-700',
    update: 'bg-blue-100 border-blue-400 text-blue-700',
    delete: 'bg-red-100 border-red-400 text-red-700',
    error: 'bg-yellow-100 border-yellow-400 text-yellow-700',
};

interface Props {
    type: 'success' | 'update' | 'delete' | 'error';
    children: React.ReactNode
}

export const Alert = ({ type, children }: Props) => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;
    return (
        <div className="fixed inset-0  flex items-start justify-end">
            <div className={`border-l-4 p-4 ${alertStyles[type]} rounded-md`}>
                <button
                    onClick={() => setVisible(false)}
                    className="absolute top-0 right-0 mt-2 mr-2 text-md text-gray-600 hover:text-gray-800"
                >
                    ×
                </button>
                <p className="font-bold">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                <p>{children}</p>
            </div>
        </div>
    )
}

Alert.propTypes = {
    type: PropTypes.oneOf(['success', 'update', 'delete', 'error']).isRequired,
    children: PropTypes.node.isRequired,
};