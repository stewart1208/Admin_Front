"use client";
import React, { useState, useEffect } from "react";
import { Button, Drawer, Select, message, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getAll, addUgpToPort } from "../../Actions/Port"; // getAll : pour récupérer tous les ports
import { useParams } from "next/navigation";

const AddPort = ({ onSuccess , ugp}) => {
  const [open, setOpen] = useState(false);
  const [ports, setPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPorts, setLoadingPorts] = useState(true);

  useEffect(() => {
    const fetchPorts = async () => {
      try {
        const data = await getAll(); // La fonction getAll doit retourner tous les ports
        setPorts(data);
      } catch (err) {
        message.error("Erreur lors du chargement des ports");
      } finally {
        setLoadingPorts(false);
      }
    };

    fetchPorts();
  }, []);

  const handleAddPort = async () => {
    if (!selectedPort) {
      message.warning("Veuillez sélectionner un port !");
      return;
    }

    setLoading(true);
    try {
      // Appel API pour lier le port sélectionné à l'UGP (ugpId)
      await addUgpToPort(selectedPort, ugp.id);
      message.success("Port ajouté avec succès !");
      setOpen(false);
      onSuccess(); // Rafraîchit l'UGP (et donc la liste des ports associés)
    } catch (err) {
      message.error("Échec de l'ajout du port !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
        Ajouter un port
      </Button>

      <Drawer title="Ajouter un port à l'UGP" width={400} onClose={() => setOpen(false)} open={open}>
        {loadingPorts ? (
          <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
        ) : (
          <Select
            style={{ width: "100%" }}
            placeholder="Sélectionnez un port"
            onChange={setSelectedPort}
          >
            {ports.map((port) => (
              <Select.Option key={port.id} value={port.id}>
                {port.matricule} - {port.dayra}
              </Select.Option>
            ))}
          </Select>
        )}

        <Button
          type="primary"
          block
          style={{ marginTop: "15px" }}
          onClick={handleAddPort}
          loading={loading}
        >
          Lier le Port à l'UGP
        </Button>
      </Drawer>
    </>
  );
};

export default AddPort;
