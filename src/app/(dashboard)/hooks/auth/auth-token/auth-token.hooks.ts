"use client"
import { useState, useEffect } from "react";


export const useAuth = () => {
    const [role, setRole] = useState<string | null>(null);
    const [user, setUser] = useState<any | null>(null);  // Adjust the type of user as needed
    const [idUsuario, setIdUsuario] = useState<number | null>(null);
    const [idEmpresa, setIdEmpresa] = useState<number | null>(null);
    const [sub, setSub] = useState<string | null>(null);
    const [idEmpleado, setIdEmpleado] = useState<any | null>(null);
    const [idSede, setIdSede] = useState<any>(null)
    const [sede, setSede] = useState<any>(null)
    const [titleHead, setTitleHead] = useState<any>(null)
    const [nameTitleHead, setNameTitleHead] = useState<any>(null)

    useEffect(() => {
        const storedDecodedToken = window.localStorage.getItem('decodedToken');
        if (storedDecodedToken) {
            const decodedToken = JSON.parse(storedDecodedToken);

            setRole(decodedToken.role ?? null);
            setUser(decodedToken.empleado ?? null);
            setIdUsuario(decodedToken.id_usuario ?? null);
            setIdEmpresa(decodedToken.id_empresa ?? null);
            setSub(decodedToken.sub ?? null);
            setIdEmpleado(decodedToken.id_empleado);
            setIdSede(decodedToken.id_sede);
            setSede(decodedToken.sede);
            setTitleHead(decodedToken.titulo.id_cabecera_detalle);
            setNameTitleHead(decodedToken.titulo.descripcion);
        }
    }, []);

    return { role, user, idUsuario, idEmpresa, sub, idEmpleado, sede, idSede, titleHead, nameTitleHead };
};