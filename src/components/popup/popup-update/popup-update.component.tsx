import React from "react"

interface Props {
    children: React.ReactNode
}

export const PopupUpdate = ({ children }: Props) => (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 m-auto w-[1000px] max-w-full rounded-md shadow-lg max-h-full overflow-y-auto   m-4">
            {children}
        </div>
    </div>
);
