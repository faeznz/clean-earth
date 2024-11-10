import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TambahNasabah = () => {
  const [formData, setFormData] = useState({
    nama: '',
    no_telpon: '',
    alamat: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://precious-battledress-ray.cyclic.app/nasabah', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/dashboard/nasabah');
      } else {
        console.error('Gagal mengirim data');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <main>
        <div className="relative mx-4 sm:p-6 rounded-sm overflow-hidden">
          <h1 className="font-poppins p-4 rounded-lg text-2xl md:text-3xl bg-[#718977] text-white shadow-xl font-bold capitalize">
            Tambah Data Nasabah
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="m-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Nama:</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">No Telepon:</label>
            <input
              type="text"
              name="no_telpon"
              value={formData.no_telpon}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Alamat:</label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              rows="4"
              className="mt-1 p-2 w-full border rounded-md"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#B0D9B1] py-2 px-4 rounded hover:bg-[#B0D9B1]"
          >
            Simpan
          </button>
        </form>
      </main>
    </div>
  );
};

export default TambahNasabah;
