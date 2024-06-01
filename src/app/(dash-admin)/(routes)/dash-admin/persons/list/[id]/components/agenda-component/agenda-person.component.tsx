"use client";
import React, { useState, useEffect } from 'react';
import CreateAgendaComponent from './components/create/create-agenda.component';

interface Props {
    idPerson?: number;
    dataPerson?: any;
}

export default function AgendaPersonComponent({ dataPerson, idPerson }: Props) {

    // Create
    const [showPopup, setShowPopup] = useState(false);
    // end to create

    // Update
    const [showPopupUpdate, setShowPopupUpdate] = useState(false);
    const [selectedAgendaId, setSelectedAgendaId] = useState<number | null>(null);
    // end to update

    // Get datatable
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [filter, setFilter] = useState('');
    // end to hooks

    // Create
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    //End to create

    const togglePopupId = (id?: number) => {
        if (id) {
            setSelectedAgendaId(id)
        }
        setShowPopupUpdate(!showPopupUpdate)
    }

    return (
        <div className="bg-white p-6 rounded-lg">
            <div className='flex justify-center items-center'>
                <h1>Apertura de agenda</h1>

                {/* <button onClick={togglePopup}>Crear</button> */}
            </div>
            {/* <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table> */}
            {showPopup && (
                <CreateAgendaComponent
                    id={idPerson}
                    data={dataPerson}
                    onClose={togglePopup}
                />
            )}
        </div>
    )
}
