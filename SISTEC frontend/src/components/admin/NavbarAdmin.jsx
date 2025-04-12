import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './NavbarAdmin.css';
import logo from '../../assets/sistec-logo.png';

export default function NavbarAdmin() {
  return (
    <div className="navbar-admin">
      <div className="navbar-left">
        <img src={logo} alt="SISTEC" className="logo-admin" />
      </div>

      <div className="navbar-center">
        <NavLink to="/dashboard-admin" className="nav-link-admin">Dashboard</NavLink>
        <NavLink to="/agregar-solicitud" className="nav-link-admin">Solicitudes</NavLink>
        <NavLink to="/vista-componente" className="nav-link-admin">Componentes</NavLink>
        <NavLink to="/tecnicos-disponibles" className="nav-link-admin">Técnicos</NavLink>
        <NavLink to="/recomendaciones-compra" className="nav-link-admin">Recomendaciones</NavLink>
        <NavLink to="/evaluacion-tecnicos" className="nav-link-admin">Evaluación</NavLink>
        <NavLink to="/dashboard-reportes" className="nav-link-admin">Reportes</NavLink>
      </div>

      <div className="navbar-right">
        <FaUserCircle className="user-icon" />
        <div className="user-info">
          <p className="user-name">Usuario</p>
          <p className="user-role">Admin account</p>
        </div>
      </div>
    </div>
  );
}
