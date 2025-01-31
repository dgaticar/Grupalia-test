import { useState } from "react";
import { useRouter } from "next/router"; 
import { createClient } from "@supabase/supabase-js";
import styles from './crear-oferta.module.css'; 

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CrearOferta() {
  const router = useRouter();
  const [tipo, setTipo] = useState("compra");
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [monto, setMonto] = useState("");
  const [contacto, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carga
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fecha = new Date().toISOString();
    setLoading(true); // Inicia el estado de carga

    // Determinar en qué tabla insertar los datos (compra o venta)
    const tabla = tipo === "compra" ? "compra" : "venta";

    
    try {
      // Inserta la oferta en la base de datos
      const { error } = await supabase
        .from(tabla)
        .insert([{
            monto,
            ubicacion,
            nombre,
            fecha,
            contacto,
          }]);
      if (error) throw error;
      // Redirigir al listado de ofertas (página anterior) después de la creación
      router.push("/anuncios");
    } catch (error) {
      console.error("Error al crear la oferta:", error.message);
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Crear Oferta</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="tipo" className={styles.label}>Tipo de oferta</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className={styles.selectField}
          >
            <option value="compra">Compra</option>
            <option value="venta">Venta</option>
          </select>
        </div>

        <div>
          <label htmlFor="nombre" className={styles.label}>Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>

        <div>
          <label htmlFor="ubicacion" className={styles.label}>Ubicación</label>
          <input
            type="text"
            id="ubicacion"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>

        <div>
          <label htmlFor="monto" className={styles.label}>Monto</label>
          <input
            type="number"
            id="monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>

        <div>
          <label htmlFor="descripcion" className={styles.label}>Contacto</label>
          <textarea
            id="contacto"
            value={contacto}
            onChange={(e) => setDescripcion(e.target.value)}
            className={styles.textareaField}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Confirmar"}
          </button>
        </div>
      </form>
    </div>
  );
}
              
