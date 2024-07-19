import { useState } from 'react'

export default function TabsOpensHook() {
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

    const toggleAccordion = (sectionId: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };
    return {
        openSections, toggleAccordion
    }
}
