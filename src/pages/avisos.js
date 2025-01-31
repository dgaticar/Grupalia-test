import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AvisosPage() {
  const [avisos, setAvisos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  useEffect(() => {
    const fetchAvisos = async () => {
      const { data, error } = await supabase.from("avisos").select("*");
      if (!error) setAvisos(data);
    };
    fetchAvisos();
  }, []);

  const handlePublicar = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user) return alert("Debes iniciar sesión");

    const { error } = await supabase.from("avisos").insert([
      { titulo, descripcion, usuario_id: user.id },
    ]);
    if (!error) {
      alert("Aviso publicado!");
      setAvisos([...avisos, { titulo, descripcion }]);
      setTitulo("");
      setDescripcion("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Publicar Aviso</h1>
      <input
        type="text"
        placeholder="Título"
        className="border p-2 my-2 w-full"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        className="border p-2 my-2 w-full"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button
        onClick={handlePublicar}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Publicar
      </button>

      <h2 className="text-xl font-bold mt-4">Avisos Publicados</h2>
      {avisos.map((aviso, index) => (
        <div key={index} className="border p-4 my-2">
          <h3 className="font-bold">{aviso.titulo}</h3>
          <p>{aviso.descripcion}</p>
        </div>
      ))}
    </div>
  );
}
