import React, { useState } from "react";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal"

const HomePage = () => {
  const columns = [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "action", label: "Action" },
  ];
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [data, setData] = useState([
    { name: "John Doe", age: 28 },
    { name: "Jane Smith", age: 32 },
    { name: "Bob Johnson", age: 45 },
    { name: "Alice Williams", age: 25 },
    { name: "Eve Davis", age: 30 },
    { name: "Charlie Brown", age: 35 },
    { name: "Daniel Green", age: 29 },
    { name: "Grace Lee", age: 41 },
    { name: "Hannah White", age: 22 },
    { name: "James Black", age: 38 },
    { name: "Olivia Harris", age: 27 },
    { name: "Liam Clark", age: 31 },
    { name: "Sophia King", age: 33 },
    { name: "Lucas Walker", age: 40 },
    { name: "Amelia Wright", age: 26 },
  ]);

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setShowModal(true);
  };

  const confirmDelete = () => {
    const newData = [...data];
    newData.splice(deleteIndex, 1);
    setData(newData);
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const updatedData = data.map((row, index) => ({
    ...row,
    action: (
      <button
        onClick={() => handleDelete(index)}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    ),
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Paginated Table</h1>
      <DataTable data={updatedData} columns={columns} initialPageSize={10} />

      {showModal && (
        <ConfirmModal
          title="Confirm Deletion"
          message="Are you sure you want to delete this record?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default HomePage;
