import { useEffect, useState } from "react";
import { getMatakuliah, deleteMatakuliah } from "@/services/api";
import type { MatakuliahType } from "@/types/Matakuliah";
import { useNavigate } from "react-router-dom";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";

export default function MatakuliahList() {
  const [data, setData] = useState<MatakuliahType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    itemToDelete: MatakuliahType | null;
  }>({
    isOpen: false,
    itemToDelete: null,
  });
  const closeModal = () => {
    setModalState({
      isOpen: false,
      itemToDelete: null,
    });
  };
  const handleDelete = () => {
    if (modalState.itemToDelete) {
      deleteMatakuliah(modalState.itemToDelete.kode)
        .then(() => {
          fetchData();
        })
        .catch(() => alert("Gagal mengambil data Matakuliah"));
    }
  };

  const openDeleteModal = (item: MatakuliahType) => {
    setModalState({
      isOpen: true,
      itemToDelete: item,
    });
  };

  const fetchData = () => {
    getMatakuliah()
      .then((res) => setData(res.data as MatakuliahType[]))
      .catch(() => alert("Gagal mengambil data Matakuliah"));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3 border">Kode</th>
              <th className="px-4 py-3 border">Nama</th>
              <th className="px-4 py-3 border">SKS</th>
              <th className="px-4 py-3 border">Semester</th>
              <th className="px-4 py-3 border">Jurusan</th>
              <th className="px-4 py-3 border">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {pageData.map((matkul) => (
              <tr key={matkul.kode} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{matkul.kode}</td>
                <td className="px-4 py-2 border">{matkul.nama}</td>
                <td className="px-4 py-2 border">{matkul.sks}</td>
                <td className="px-4 py-2 border">{matkul.semester}</td>
                <td className="px-4 py-2 border">{matkul.jurusan}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => navigate(`edit/${matkul.kode}`)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Edit
                  </button>
                  <span className="mx-2">|</span>
                  <button
                    onClick={() => openDeleteModal(matkul)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Tidak ada data Matakuliah.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 rounded ${
              currentPage === i + 1
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-800 border"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <DeleteConfirmation
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        itemName={modalState.itemToDelete?.nama}
      />
    </div>
  );
}
