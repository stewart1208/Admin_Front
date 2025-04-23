'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPortById } from '@/Actions/Transport/Port';
import PortForm from '@/Components/Transport/Port/PortForm';
import { PlusOutlined } from '@ant-design/icons';
import NavireCard from '@/Components/Transport/Navire/NavireCard'; 
import LocationCard from '@/Components/Transport/Location/LocationSimple';
import { Button, Spin ,List,Drawer} from 'antd';

const PortDetails = () => {
  const { id } = useParams();
  const [port, setPort] = useState(null);
  const [open, setOpen] = useState(false);
  const [editingPort, setEditingPort] = useState(null);
  const [showAllNavires, setShowAllNavires] = useState(false);
  const [showAllLocations, setShowAllLocations] = useState(false);

  useEffect(() => {
    if (id) {
      getPortById(id).then(setPort);
    }
  }, [id]);

  if (!port) return <Spin />;
  const handleEdit = (port) => {
    setEditingPort(port);
    setOpen(true);
  };
  const allLocations = port.loyers;
  const naviresToShow = showAllNavires ? port.navires : port.navires.slice(0, 3);
  const locationsToShow = showAllLocations ? allLocations : allLocations.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-3xl font-semibold text-center "> {port.commune} ({port.matricule})</h2>
        <p>Dayra : {port.dayra}</p>
        <p>Wilaya : {port.wilaya}</p>
      </div>
      <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleEdit}
          size="large"
          className="rounded-xl shadow"
        >
          UpDate le Port
        </Button>      <div>
        <h3 className="text-lg font-bold mb-2">Navires dans ce port :</h3>
        <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={naviresToShow}
        renderItem={(navire) => (
          <List.Item style={{ display: "flex", justifyContent: "center" }}>
              <NavireCard navire={navire} />
          </List.Item>
        )}
      />
        {port.navires.length > 3 && (
          <div className="mt-3">
            <Button type="link" onClick={() => setShowAllNavires(prev => !prev)}>
              {showAllNavires ? 'Voir moins' : 'Voir tous les navires'}
            </Button>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-bold mb-2">Locations dans ce port :</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {locationsToShow.map(location => (
            <LocationCard key={location.id} id={location.id} />
          ))}
        </div>
        {allLocations.length > 3 && (
          <div className="mt-3">
            <Button type="link" onClick={() => setShowAllLocations(prev => !prev)}>
              {showAllLocations ? 'Voir moins' : 'Voir toutes les locations'}
            </Button>
          </div>
        )}
      </div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={editingPort ? "Modifier le port" : "Créer un port"}
        width={500}
        destroyOnClose
      >
        <PortForm
          port={editingPort}
          onClose={() => {
            setOpen(false);
            fetchPorts();
          }}
        />
      </Drawer>
    </div>
  );
};

export default PortDetails;
