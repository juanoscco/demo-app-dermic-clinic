"use client"
import React, { useState } from 'react'

interface Step {
    id: number;
    title: string;
    fields: JSX.Element[];
}

interface Cuarto {
    cuarto: string;
    piso: string;
    estadoCuarto: string;
}
export default function InfrastructureCreate() {
    const [formStep, setFormStep] = useState<number>(0);
    const [formData, setFormData] = useState<any>({
        lugar: '',
        codigoLocalizacion: '',
        direccion: '',
        celular: '',
        estado: '',
        cuartos: [],
    });

    const handleContinue = () => {
        if (formStep === steps.length - 1) {
            handleSubmit();
            alert('Datos enviados satisfactoriamente');
        } else {
            setFormStep((prevStep) => prevStep + 1);
        }
    };
    const handleBack = () => {
        if (formStep > 0) {
            setFormStep((prevStep) => prevStep - 1);
        }
    };

    const handleAddCuarto = () => {
        setFormData({
            ...formData,
            cuartos: [
                ...formData.cuartos,
                { cuarto: '', piso: '', estadoCuarto: '' },
            ],
        });
    };

    const handleRemoveCuarto = (index: number) => {
        const updatedCuartos = [...formData.cuartos];
        updatedCuartos.splice(index, 1);
        setFormData({ ...formData, cuartos: updatedCuartos });
    };

    // const handleCuartoChange = (index: number, fieldId: string, value: any) => {
    //     const updatedCuartos = [...formData.cuartos];
    //     updatedCuartos[index][fieldId] = value;
    //     setFormData({ ...formData, cuartos: updatedCuartos });
    // };

    const handleCuartoChange = (index: number, fieldId: string, value: any) => {
        const updatedCuartos = formData.cuartos.map((cuarto: any, i: number) => {
            if (i === index) {
                return { ...cuarto, [fieldId]: value };
            }
            return cuarto;
        });
        setFormData({ ...formData, cuartos: updatedCuartos });
    };

    const handleSubmit = () => {
        console.log('Enviando formulario:', formData);
    };

    const handleChange = (fieldId: string, value: any) => {
        setFormData({ ...formData, [fieldId]: value });
    };


    const steps: Step[] = [
        {
            id: 1,
            title: 'Paso 1',
            fields: [
                <section key="infrastructure" className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Distrito
                            <span className="text-red-500">*</span></label>
                        <input key="lugar" type="text" className='w-full py-2 outline-none px-1'
                            onChange={(e) => handleChange('lugar', e.target.value)} />
                    </div>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Código postal
                            <span className="text-red-500">*</span></label>
                        <input key="codigoLocalizacion" type="text" className='w-full py-2 outline-none px-1'
                            onChange={(e) => handleChange('codigoLocalizacion', e.target.value)} />
                    </div>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Dirección
                            <span className="text-red-500">*</span></label>
                        <input key="direccion" type="text" className='w-full py-2 outline-none px-1'
                            onChange={(e) => handleChange('direccion', e.target.value)} />
                    </div>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Celular
                            <span className="text-red-500">*</span></label>
                        <input key="celular" type="text" className='w-full py-2 outline-none px-1'
                            onChange={(e) => handleChange('celular', e.target.value)} />
                    </div>
                    <div className="border border-gray-300 text-left p-2">
                        <label className='text-font-777 text-sm'>Estado
                            <span className="text-red-500">*</span></label>
                        {/* <input key="estado" type="text" className='w-full py-2 outline-none px-1'
                            onChange={(e) => handleChange('estado', e.target.value)} /> */}
                        <select className='w-full py-2 outline-none px-1' onChange={(e) => handleChange('estado', e.target.value)}>
                            <option value="Habilitado">Habilitado</option>
                            <option value="Deshabilitado">Deshabilitado</option>
                        </select>
                    </div>
                </section>
            ],
        },
        {
            id: 2,
            title: 'Paso 2',
            fields: [
                <React.Fragment key="cuartos">
                    <div className='w-full mb-3'>
                        <button type="button" onClick={handleAddCuarto} className=' text-blue-500'>+ Agregar</button>
                    </div>
                    {formData.cuartos.map((cuarto: Cuarto, index: number) => (

                        <section key={index} className='grid grid-cols-1 md:grid-cols-3 gap-2 '>
                            <div className='grid grid-cols-2 gap-2 mb-2'>
                                <div className="border border-gray-300 text-left p-2 m-2">
                                    <label className='text-font-777 text-sm md:text-base'>Cuarto <span className="text-red-500">*</span></label>
                                    <input type="text" className='w-full py-2 outline-none px-1 text-sm md:text-base' value={cuarto.cuarto} onChange={(e) => handleCuartoChange(index, 'cuarto', e.target.value)} />
                                </div>
                                <div className="border border-gray-300 text-left p-2 m-2">
                                    <label className='text-font-777 text-sm md:text-base'>Piso <span className="text-red-500">*</span></label>
                                    <input type="text" className='w-full py-2 outline-none px-1 text-sm md:text-base' value={cuarto.piso} onChange={(e) => handleCuartoChange(index, 'piso', e.target.value)} />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-2 mb-2'>

                                <div className="border border-gray-300 text-left p-2 m-2">
                                    <label className='text-font-777 text-sm md:text-base'>Estado <span className="text-red-500">*</span></label>
                                    <select className='w-full py-2 outline-none px-1 text-sm md:text-base'
                                        value={cuarto.estadoCuarto}
                                        onChange={(e) => handleCuartoChange(index, 'estadoCuarto', e.target.value)}
                                    >
                                        <option value="Habilitado">Habilitado</option>
                                        <option value="Deshabilitado">Deshabilitado</option>
                                    </select>
                                </div>

                            </div>
                            <div className='grid grid-cols-1 gap-2 mb-2'>
                                <button
                                    className='cursor-pointer w-full md:w-2/6 rounded-md text-red-500  text-sm md:text-base'
                                    onClick={() => handleRemoveCuarto(index)}>Eliminar</button>
                            </div>
                        </section>
                    ))}
                </React.Fragment>,
            ],
        },
    ];

    return (
        <React.Fragment>
            <h1 className='text-2xl'>Creacion de infraestructura</h1>
            <section className='mt-4 p-4 bg-white'>
                <form onSubmit={(e) => e.preventDefault()}>
                    {/* title */}
                    <div className="flex gap-2">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className={`border-b p-2 border-gray-200  rounded-sm ${index === formStep ? 'active' : ''}`}
                                onClick={() => setFormStep(index)}

                            >
                                <span style={{ color: index === formStep ? 'green' : 'grey' }}>{step.title}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        {steps[formStep].fields.map((field, index) => (
                            <section key={index}>{field}</section>
                        ))}
                        <div className="flex gap-2">
                            {formStep > 0 &&
                                <button type="button" className='bg-yellow-300  p-3 mt-2 rounded-sm' onClick={handleBack}>Atrás</button>
                            }
                            <button type="submit" className='bg-[#82b440] text-white p-3 mt-2 rounded-sm' onClick={handleContinue}>{formStep === steps.length - 1 ? 'Enviar' : 'Continuar'}</button>
                        </div>
                    </div>
                </form>
            </section>
        </React.Fragment >
    );
}

