import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';

import CertificationsView from '../../pages/CertificationsView';

function Certifications() {
  const { currentUser } = useContext(AuthContext);
  const [activeBgColor, setActiveBgColor] = useState('');

  //   console.log(categories);
  return (
    <div className='mt4'>
      <div className='container1'>
        <div className='container'>
          <h1>Certifications</h1>
        </div>

        <div
          className='mt3 d-flex'
          style={{
            backgroundColor: activeBgColor ? activeBgColor : 'transparent',
          }}>
          <div className='container c16'>
            <CertificationsView
              role={'student'}
              setActiveBgColor={setActiveBgColor}
              id_user={currentUser.id_user}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certifications;
