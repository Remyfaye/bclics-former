import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import ConfirmDelete from "../layout/ConfirmDelete";

const EditCategories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(false);
  const [catId, setCatId] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [id, setId] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [cancelBtn, setCancelBtn] = useState(false);

  useEffect(() => {
    getAllCategories();
    // console.log(categories);
  }, [categories]);

  const getAllCategories = async () => {
    fetch("api/category").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  };

  const deleteItem = async () => {
    const createPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/category", {
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
    setEditingCategory(false);
    setConfirmDelete(false);
  };

  const handleSubmitCategory = async () => {
    setDisableBtn(true);

    const fetchPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("api/category", {
        method: editingCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName, _id: catId }),
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }

      await toast.promise(fetchPromise, {
        loading: "loading...",
        success: editingCategory ? "edited" : "created",
        error: "an error occured",
      });

      setCategoryName("");
      setDisableBtn(false);
      setEditingCategory(false);
    });
    setDisableBtn(false);
  };
  return (
    <section className="lg:max-w-2xl lg:mx-auto p-5">
      <div className="flex items-center">
        <label className="capitalize">
          <p>{editingCategory ? "edit category" : "create category"}</p>
          <input
            //   type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </label>
        <div className="ml-2 mb-[-15px] flex">
          <button
            disabled={disableBtn}
            onClick={handleSubmitCategory}
            className="btn ml-3"
          >
            {" "}
            {editingCategory ? "save " : "create "}
          </button>

          {cancelBtn && (
            <>
              <button
                disabled={disableBtn}
                onClick={() => (
                  setEditingCategory(false),
                  setCategoryName(""),
                  setCancelBtn(false)
                )}
                className=" ml-3 border py-2 px-1 rounded-xl"
              >
                cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* category list */}
      <div className="mt-10">
        <h1>Edit Category :</h1>
        {/* {categories.length > 0 && */}
        {categories?.map((c) => (
          <>
            <div
              className="bg-gray-300 p-4 my-3 capitalize rounded-lg flex items-center justify-between"
              onClick={() => setCatId(c._id)}
            >
              <h1
                onClick={() => (
                  setCategoryName(c.name), setEditingCategory(true)
                )}
              >
                {c.name}
              </h1>
              <div>
                <button
                  className="border bg-white px-3 py-1  rounded-xl"
                  onClick={() => (
                    setCategoryName(c.name),
                    setEditingCategory(true),
                    setCancelBtn(true)
                  )}
                >
                  Edit{" "}
                </button>
                <button
                  className="border px-2 py-1 ml-3 rounded-xl bg-red-600 text-white"
                  onClick={() => (setId(c._id), setConfirmDelete(true))}
                >
                  Delete
                </button>
              </div>
              {/* <MdDeleteForever
                onClick={() => (setId(c._id), setConfirmDelete(true))}
                className=" text-3xl text-red-600"
              /> */}
            </div>

            {/* confirmDelete */}
            {confirmDelete && (
              <div className="fixed h-screen top-0 mx-auto bg-black/50 inset-0 ">
                <div className="bg-white mx-auto w-[90%] gap-5 capitalize lg:max-w-3xl mt-[38vh] p-5 m-5 ">
                  <h1 className="text-center m-3 text-gray-500">
                    are you sure you want to delete?
                  </h1>
                  <div className="flex gap-4 justify-center">
                    <button
                      className="border p-2 rounded-xl"
                      onClick={() => setConfirmDelete(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="border bg-primary text-white capitalize p-2 rounded-xl"
                      onClick={deleteItem}
                    >
                      yes, delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </section>
  );
};

export default EditCategories;
