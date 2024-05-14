export const renderLastName = (fullName: string) => {
    const nameParts = fullName.split(' ');
    const firstNameIndex = 2; // Assuming names always start from the third part
    const apellidoPaterno = nameParts[0];
    const apellidoMaterno = nameParts[1];
    const nombres = nameParts.slice(firstNameIndex).join(' ');

    return `${apellidoPaterno} ${apellidoMaterno}`
};
export const renderName = (name: string) => {
    const nameParts = name.split(' ');
    const firstNameIndex = 2;
    // const apellidoPaterno = nameParts[0];
    // const apellidoMaterno = nameParts[1];
    const nombres = nameParts.slice(firstNameIndex).join(' ');

    return `${nombres}`
}