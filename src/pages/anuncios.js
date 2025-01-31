import { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import Link from 'next/link';


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Anuncios() {
  const [compra, setCompra] = useState([]);
  const [venta, setVenta] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null); // Para manejar el anuncio seleccionado

  useEffect(() => {
    const fetchAnuncios = async () => {
      // Obtén los anuncios de "compra" y "venta"
      const { data: compraData, error: compraError } = await supabase
        .from("compra")
        .select("*");
      const { data: ventaData, error: ventaError } = await supabase
        .from("venta")
        .select("*");

      if (compraError || ventaError) {
        console.error("Error al obtener los anuncios:", compraError, ventaError);
      } else {
        setCompra(compraData);
        setVenta(ventaData);
      }
    };

    fetchAnuncios();
  }, []);

  // Función para abrir el modal con la información completa del anuncio
  const openModal = (ad) => {
    setSelectedAd(ad);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedAd(null);
  };

  return (
    <div className="anuncios-container">
      <h1>Anuncios</h1>

      {/* Botón para agregar un nuevo aviso */}
      <div className="button-container">
        <Link href="/crear-oferta">
          <button className="add-offer-button">Agregar Nuevo Aviso</button>
        </Link>
      </div>

      <div className="listados-container">
        {/* Listado de Compra */}
        <div className="listado">
          <h2>Compra</h2>
          <div className="adList">
            {compra.map((ad) => (
              <div
                key={ad.id}
                className="adCard"
                onClick={() => openModal(ad)}
              >
                <h3>{ad.nombre}</h3>
                <p>{ad.monto} - {ad.ubicacion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Listado de Venta */}
        <div className="listado">
          <h2>Venta</h2>
          <div className="adList">
            {venta.map((ad) => (
              <div
                key={ad.id}
                className="adCard"
                onClick={() => openModal(ad)}
              >
                <h3>{ad.nombre}</h3>
                <p>{ad.monto} - {ad.ubicacion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal para mostrar el anuncio completo */}
      {selectedAd && (
        <div className="modal">
          <div className="modalContent">
            <h2>{selectedAd.nombre}</h2>
            <p><strong>Monto:</strong> {selectedAd.monto}</p>
            <p><strong>Ubicación:</strong> {selectedAd.ubicacion}</p>
            <p><strong>Contacto:</strong> {selectedAd.contacto}</p>
            <p><strong>Fecha:</strong> {new Date(selectedAd.fecha).toLocaleDateString()}</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .anuncios-container {
          padding: 20px;
          text-align: center;
        }

        .button-container {
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
        }

        .add-offer-button {
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        .add-offer-button:hover {
          background-color: #45a049;
        }

        .listados-container {
          display: flex;
          justify-content: center;
          gap: 30px; /* Espacio entre los dos listados */
          margin-top: 40px;
        }

        .listado {
          width: 45%; /* Ajusta el ancho de cada listado */
        }

        .adList {
          display: flex;
          flex-direction: column;
          gap: 15px; /* Espacio entre los anuncios */
        }

        .adCard {
          cursor: pointer;
          background: #f9f9f9;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: all 0.3s ease;
        }

        .adCard:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modalContent {
          background: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 500px;
          width: 80%;
        }

        button {
          padding: 10px 20px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background: #45a049;
        }

        h1 {
          color: #333;
          margin-bottom: 20px;
        }

        h2 {
          color: #4CAF50;
          margin-bottom: 10px;
        }

        p {
          margin: 5px 0;
          color: #555;
        }
      `}</style>
    </div>
  );
}
