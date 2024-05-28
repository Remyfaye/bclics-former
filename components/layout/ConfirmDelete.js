import React from "react";

const ConfirmDelete = ({ id }) => {
  const deleteItem = async () => {
    const createPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    if (id === "") {
      toast("pls try again");
    } else {
      await toast.promise(createPromise, {
        loading: "deleting...",
        success: "deleted",
        error: "error",
      });
    }
  };
  return (
    <div>
      <button onClick={deleteItem}>cancel</button>
      <button onClick={deleteItem}>yes, delete</button>
    </div>
  );
};

export default ConfirmDelete;
