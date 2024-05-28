export interface Props {
    isNavActive: any,
    handleNavItemClick: any,
}

// Definición de la interfaz para los enlaces
export interface LinkItem {
    href: string;
    text: string;
}

// Definición de la interfaz para cada sección
export interface Section {
    id: string;
    title: string;
    icon: string;
    links?: LinkItem[];
    link?: string;
}