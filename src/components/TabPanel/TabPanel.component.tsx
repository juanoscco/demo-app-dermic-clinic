import React, { useState } from 'react'
import { Tab } from "@/models/TabPanel/TabPanel.model"

export const TabPanel = ({ tabs }: { tabs: Tab[] }) => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleTabChange = (tabIndex: number) => {
        setActiveTab(tabIndex);
    };

    return (
        <div className=" h-5/6 mt-3 rounded-sm">
            <div className="flex gap-5 p-2 rounded-md bg-white">
                {tabs.map((tab, index) => (
                    <div
                        key={tab.id}
                        className={`border-b cursor-pointer p-2 ${index === activeTab ? ' text-[#82b440] focus:text-[#82b440] border-[#82b440]' : 'text-gray-500 border-gray-200'}`}
                        onClick={() => handleTabChange(index)}
                    >
                        {tab.title}
                    </div>
                ))}
            </div>
            <section className="h-full ">{tabs[activeTab].content}</section>
        </div>
    );
};