import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSignosVitales } from './hooks/useSignosVitales';
import SignosVitalesForm from './components/SignosVitalesForm';
import SignosVitalesList from './components/SignosVitalesList';
import { toast } from 'react-toastify';

export default function SignosVitalesPanel({ pacienteId }) {
  const { token } = useAuth();
  const { 
    signosVitales, 
    loading, 
    error,
    create, 
    update, 
    remove, 
    refresh 
  } = useSignosVitales(pacienteId);
  
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (data) => {
    try {
      if (editId) {
        await update(editId, data, token);
        toast.success('Registro de signos vitales actualizado correctamente');
      } else {
        await create(data, token);
        toast.success('Registro de signos vitales creado correctamente');
      }
      setEditId(null);
      setEditData(null);
      refresh();
    } catch (error) {
      console.error('Error al guardar signos vitales:', error);
      toast.error(`Error al ${editId ? 'actualizar' : 'crear'} el registro de signos vitales`);
    }
  };

  const handleEdit = (signos) => {
    setEditId(signos._id || signos.id);
    setEditData({
      ...signos,
      fecha: signos.fecha ? new Date(signos.fecha).toISOString().split('T')[0] : ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este registro de signos vitales?')) {
      try {
        await remove(id, token);
        toast.success('Registro de signos vitales eliminado correctamente');
        refresh();
      } catch (error) {
        console.error('Error al eliminar signos vitales:', error);
        toast.error('Error al eliminar el registro de signos vitales');
      }
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData(null);
  };

  if (loading && !signosVitales.length) {
    return <div style={{ textAlign: 'center', padding: '20px', color: '#6b4f2c' }}>Cargando signos vitales...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#6b4f2c', marginBottom: '20px' }}>Registro de Signos Vitales</h2>
      
      <SignosVitalesForm 
        onSubmit={handleSubmit} 
        initialData={editData}
        onCancel={editId ? handleCancel : null}
      />
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#6b4f2c' }}>
          Cargando registros...
        </div>
      ) : (
        <SignosVitalesList 
          signosVitales={signosVitales}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
