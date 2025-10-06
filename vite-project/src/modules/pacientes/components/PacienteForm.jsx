import { useState, useEffect } from "react";

export default function PacienteForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    documento: "",
    tipoDocumento: "",
    fechaNacimiento: "",
    correo: "",
    genero: "",
    direccion: "",
    telefono: "",
    estado: "activo",
    acompananteNombre: "",
    acompananteTelefono: "",
    acompananteParentesco: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        nombre: "",
        apellidos: "",
        documento: "",
        tipoDocumento: "",
        fechaNacimiento: "",
        correo: "",
        genero: "",
        direccion: "",
        telefono: "",
        estado: "activo",
        acompananteNombre: "",
        acompananteTelefono: "",
        acompananteParentesco: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      acompananteNombre,
      acompananteTelefono,
      acompananteParentesco,
      ...rest
    } = form;
    const pacienteData = {
      ...rest,
      acompanante: {
        nombre: acompananteNombre,
        telefono: acompananteTelefono,
        parentesco: acompananteParentesco,
      },
    };
    onSubmit(pacienteData);
  };

  const inputStyle = {
    background: "#fff",
    border: "2px solid #bdc3c7",
    color: "#2c3e50",
    padding: "10px 14px",
    borderRadius: "4px",
    fontSize: "14px",
    width: "calc(50% - 8px)",
    minWidth: "200px",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: 12,
        justifyContent: "center",
        maxWidth: "900px",
        margin: "0 auto"
      }}
    >
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre del paciente *"
        required
        style={inputStyle}
      />
      <input
        name="apellidos"
        value={form.apellidos}
        onChange={handleChange}
        placeholder="Apellidos del paciente *"
        required
        style={inputStyle}
      />
      <input
        name="documento"
        value={form.documento}
        onChange={handleChange}
        placeholder="Número de documento *"
        required
        style={inputStyle}
      />
      <select
        name="tipoDocumento"
        value={form.tipoDocumento}
        onChange={handleChange}
        style={inputStyle}
        required
      >
        <option value="">Tipo de documento *</option>
        <option value="CC">Cédula de ciudadanía (CC)</option>
        <option value="TI">Tarjeta de identidad (TI)</option>
        <option value="CE">Cédula de extranjería (CE)</option>
        <option value="RC">Registro Civil</option>
        <option value="Otro">Otro</option>
      </select>
      <input
        name="correo"
        type="email"
        value={form.correo}
        onChange={handleChange}
        placeholder="Correo electrónico *"
        required
        style={inputStyle}
      />
      <input
        name="fechaNacimiento"
        type="date"
        value={form.fechaNacimiento}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <select
        name="genero"
        value={form.genero}
        onChange={handleChange}
        required
        style={inputStyle}
      >
        <option value="">Género *</option>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
        <option value="otro">Otro</option>
      </select>
      <input
        name="direccion"
        value={form.direccion}
        onChange={handleChange}
        placeholder="Dirección de residencia"
        style={inputStyle}
      />
      <input
        name="telefono"
        value={form.telefono}
        onChange={handleChange}
        placeholder="Teléfono de contacto"
        style={inputStyle}
      />
      <select
        name="estado"
        value={form.estado}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
      </select>
      <div
        style={{
          width: "100%",
          marginTop: 12,
          marginBottom: 8,
          fontWeight: 700,
          color: "#2c3e50",
          fontSize: 16,
          borderBottom: "2px solid #16a085",
          paddingBottom: 6,
        }}
      >
        Información del Acompañante
      </div>
      <input
        name="acompananteNombre"
        value={form.acompananteNombre}
        onChange={handleChange}
        placeholder="Nombre del acompañante"
        style={inputStyle}
      />
      <input
        name="acompananteTelefono"
        value={form.acompananteTelefono}
        onChange={handleChange}
        placeholder="Teléfono del acompañante"
        style={inputStyle}
      />
      <input
        name="acompananteParentesco"
        value={form.acompananteParentesco}
        onChange={handleChange}
        placeholder="Parentesco del acompañante"
        style={inputStyle}
      />
      <div style={{ width: "100%", display: "flex", gap: 12, marginTop: 16 }}>
        <button
          type="submit"
          style={{
            background: "#16a085",
            color: "#fff",
            fontWeight: 700,
            padding: "10px 20px",
            borderRadius: 4,
            border: "2px solid #16a085",
            cursor: "pointer",
            fontSize: 15,
            flex: 1,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            boxShadow: "0 3px 10px rgba(22, 160, 133, 0.3)",
            transition: "all 0.3s ease",
          }}
        >
          Guardar
        </button>
        {onCancel && (
          <button
            type="button"
            style={{
              background: "#95a5a6",
              color: "#fff",
              fontWeight: 700,
              padding: "10px 20px",
              borderRadius: 4,
              border: "2px solid #95a5a6",
              cursor: "pointer",
              fontSize: 15,
              flex: 1,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              boxShadow: "0 3px 10px rgba(149, 165, 166, 0.3)",
              transition: "all 0.3s ease",
            }}
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
