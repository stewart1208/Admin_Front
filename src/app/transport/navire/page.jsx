'use client';
import { useEffect, useState } from 'react';
import { getAllNavires } from '@/Actions/Transport/Navire';
import NavireCard from '@/Components/Transport/Navire/NavireCard';
import { Spin } from 'antd';

const NavireListe = () => {
  const [navires, setNavires] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllNavires().then(data => {
      setNavires(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spin />;

  return (
    <div>
      {navires.map(navire => (
        <NavireCard key={navire.id} navire={navire} />
      ))}
    </div>
  );
};

export default NavireListe;
