export const formatTime = (timeString: string) => {
    if (!timeString) return "";

    const date = new Date(`2000-01-01T${timeString}Z`); // Add an arbitrary date to use Date methods

    let hours = date.getHours();
    let minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be shown as '12'

    // Check for NaN minutes and set to 0 if needed
    if (isNaN(minutes)) minutes = 0;

    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
};



export const formatTimeExtra = (timeString: Date) => {

    if (!timeString) return "";
    const date = new Date(`2000-01-01T${timeString}Z`); // Agregamos una fecha arbitraria para usar los métodos de Date

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convertir a formato de 12 horas
    hours = hours % 12;
    hours = hours ? hours : 12; // La hora '0' debe mostrarse como '12'

    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
};