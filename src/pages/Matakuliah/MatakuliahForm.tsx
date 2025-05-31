import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createMatakuliah,
  getMatakuliahByKode,
  updateMatakuliah,
} from "@/services/api";
import type { MatakuliahType } from "@/types/Matakuliah";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const initialForm: MatakuliahType = {
  kode: "",
  nama: "",
  sks: 0,
  semester: "",
  jurusan: "",
};

export default function MatakuliahForm() {
  const [form, setForm] = useState<MatakuliahType>(initialForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { kode } = useParams();

  useEffect(() => {
    const fetchMatakuliah = async () => {
      if (kode) {
        setLoading(true);
        try {
          const data = await getMatakuliahByKode(kode);
          setForm(data.data as MatakuliahType);
        } catch (err) {
          alert("Gagal menyimpan data Matakuliah");
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchMatakuliah();
  }, [kode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm(
      (prev) =>
        ({
          ...prev,
          [name]: name === "sks" ? parseInt(value) : value,
        } as MatakuliahType)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (kode) {
        // Update existing Matakuliah
        await updateMatakuliah(kode, form);
      } else {
        // Create new Matakuliah
        await createMatakuliah(form);
      }
      navigate("/matakuliah");
    } catch (err) {
      alert("Gagal menyimpan data Matakuliah");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-6">Tambah Matakuliah</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Kode</label>
          <input
            name="kode"
            type="text"
            value={form.kode}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nama</label>
          <input
            name="nama"
            type="text"
            value={form.nama}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">SKS</label>
          <input
            name="sks"
            type="number"
            value={form.sks}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Semester</label>
          <input
            name="semester"
            type="text"
            value={form.semester}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Jurusan</label>
          <input
            name="jurusan"
            type="text"
            value={form.jurusan}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="md:col-span-2 flex justify-between mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/matakuliah")}
            className="text-sm text-gray-500 hover:underline"
          >
            Batal / Kembali
          </button>
        </div>
      </form>
    </div>
  );
}
