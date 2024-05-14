import React from 'react'

export default function TabsOpensHook() {
    const [isOpenOne, setIsOpenOne] = React.useState(false);

    const toggleAccordionOne = () => {
        setIsOpenOne(!isOpenOne);
    };

    const [isOpenTwo, setIsOpenTwo] = React.useState(false);

    const toggleAccordionTwo = () => {
        setIsOpenTwo(!isOpenTwo);
    };
    const [isOpenThree, setIsOpenThree] = React.useState(false);
    const toggleAccordionThree = () => {
        setIsOpenThree(!isOpenThree);
    };
    const [isOpenFour, setIsOpenFour] = React.useState(false);
    const toggleAccordionFour = () => {
        setIsOpenFour(!isOpenFour);
    };
    const [isOpenFive, setIsOpenFive] = React.useState(false);
    const toggleAccordionFive = () => {
        setIsOpenFive(!isOpenFive);
    };
    return {
        toggleAccordionOne,
        toggleAccordionTwo,
        toggleAccordionThree,
        toggleAccordionFour,
        toggleAccordionFive,
        isOpenOne,
        isOpenTwo,
        isOpenThree,
        isOpenFour,
        isOpenFive,
    }
}
