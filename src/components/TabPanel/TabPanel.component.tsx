import React, { useState, useEffect } from 'react'
import { Tab } from "@/components/TabPanel/interface/TabPanel.model"

export const TabPanel = ({ tabs }: { tabs: Tab[] }) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1200);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleTabChange = (tabIndex: number) => {
        setActiveTab(tabIndex);
        setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    return (
        <div className="h-5/6 mt-3 rounded-sm">
            {isMobile ? (
                <div className="relative inline-block text-left">
                    <button
                        onClick={toggleDropdown}
                        type="button"
                        className="inline-flex justify-center w-full p-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                    >
                        {tabs[activeTab].title}
                        <svg
                            className="w-5 h-5 ml-2 -mr-1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute z-10 right-50 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {tabs.map((tab, index) => (
                                <div
                                    key={tab.id}
                                    className={`${activeTab === index ? 'bg-gray-100' : ''
                                        } cursor-pointer p-2 text-sm text-gray-700`}
                                    onClick={() => handleTabChange(index)}
                                >
                                    {tab.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex gap-5 p-2 rounded-md bg-white">
                    {tabs.map((tab, index) => (
                        <div
                            key={tab.id}
                            className={`border-b cursor-pointer p-2 ${index === activeTab ? 'text-[#82b440] focus:text-[#82b440] border-[#82b440]' : 'text-gray-500 border-gray-200'
                                }`}
                            onClick={() => handleTabChange(index)}
                        >
                            {tab.title}
                        </div>
                    ))}
                </div>
            )}
            <section className="h-full p-2 bg-white rounded-md mt-2">
                {tabs[activeTab].content}
            </section>
        </div>
    );
};