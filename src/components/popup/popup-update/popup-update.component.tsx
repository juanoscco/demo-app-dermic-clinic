import React from "react"

interface Props {
    children: React.ReactNode
}

const PopupUpdate = ({ children }: Props) => (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-md shadow-lg">
            {children}
        </div>
    </div>
);
export default PopupUpdate