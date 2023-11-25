import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';
import { API_URL } from '../../constans';
import { Link, useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { AuthContext } from '../../context/authContext';

import { ReactComponent as EditIcon } from '../../assets/img/edit3.svg';
import EditCertifications from './EditCertifications';
import CertificationsView from '../../pages/CertificationsView';

function Certifications() {
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);
  const isAdmin = currentUser.role === 'admin';

  const [editMode, setEditMode] = useState(false);
  const [activeBgColor, setActiveBgColor] = useState('');

  const handleEditMode = () => {
    setEditMode(!editMode);
  };
  return (
    <div className='mt5'>
      <div className=''>
        <h1 className='center'>Certifications</h1>
        <div className='arts__wrap mt3'>
          {isAdmin && !editMode && (
            <div className='add_newItem'>
              <div className='container c16'>
                <button onClick={handleEditMode} className='plus d-flex aic g1'>
                  <EditIcon />
                  <span className=''>Manage certifications</span>
                </button>
              </div>
              <div
                className='mt3 d-flex'
                style={{
                  backgroundColor: activeBgColor ? activeBgColor : 'transparent',
                }}>
                <CertificationsView role={'admin'} setActiveBgColor={setActiveBgColor} />
              </div>
            </div>
          )}
          {isAdmin && editMode && (
            <div className='container c16'>
              <div className='add_newItem mt2'>
                {/* <button onClick={handleEditMode}><span>Save</span></button> */}
              </div>
              <EditCertifications handleEditMode={handleEditMode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Certifications;
