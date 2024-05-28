import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import ConfirmDelete from "../layout/ConfirmDelete";
import UploadImage from "../layout/UploadImage";

const EditCategories = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [isChosingImage, setIsChosingImage] = useState(false);
  const [users, setUsers] = useState([]);
  const [editingUsers, setEditingUsers] = useState(false);
  const [catId, setCatId] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [id, setId] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    getAllUsers();
    // console.log(users);
  }, [users]);

  const getAllUsers = async () => {
    fetch("api/users").then((res) => {
      res.json().then((users) => {
        setUsers(users);
      });
    });
  };

  const getAUser = async () => {
    fetch("api/users").then((res) => {
      res.json().then((users) => {
        if (userId != "") {
          const user = users.find((u) => u._id === userId);
          setName(user?.name);
          setEmail(user?.email);
          setImage(user?.image);
          setPhone(user?.phone);
          console.log(user);
        }
      });
    });
    setUser(true);
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
    setEditingUsers(false);
    setConfirmDelete(false);
  };

  const handleEditUser = async () => {
    setDisableBtn(true);
    const data = { name, email, phone, image };

    const fetchPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: userId, name, email, phone, image }),
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }

      await toast.promise(fetchPromise, {
        loading: "loading...",
        success: "edited",
        error: "an error occured",
      });

      setCategoryName("");
      setDisableBtn(false);
      setEditingUsers(false);
    });
  };
  return (
    <section className="lg:max-w-2xl lg:mx-auto p-5">
      {editingUsers ? (
        <>
          {/* user Info */}
          <div className="lg:flex mb-5    gap-10 justify-center">
            {/* image */}
            <UploadImage
              image={image}
              // isUploading={isUploading}
              setImage={setImage}
              setDisabled={setDisabled}
            />

            {/* form */}
            <div className=" shadow-xl mx-10 p-5 rounded-xl lg:w-[30rem]">
              <label className="flex flex-col  gap-3">
                Full name
                <input
                  // disabled={isChosingImage}
                  className="p-4"
                  // value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={name}
                />
              </label>

              <label className="mt-5 flex flex-col gap-3">
                Email
                <input disabled className="p-4" placeholder={email} />
              </label>

              <label className="mt-5 flex flex-col gap-3">
                Number
                <input
                  // disabled={isChosingImage}
                  // value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  className="p-4 text-gray-400"
                  placeholder={phone}
                />
              </label>

              {userId && (
                <button
                  disabled={isChosingImage}
                  onClick={handleEditUser}
                  className="bg-primary mt-10 py-5 px-10 w-full text-white text-xl rounded-xl"
                >
                  edit
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* category list */}
          <div className="mt-0">
            <h1>Users :</h1>
            {/* {categories.length > 0 && */}
            {users?.map((c) => (
              <>
                <div
                  className="bg-gray-300 p-4 my-3 capitalize rounded-lg flex items-center justify-between"
                  onClick={() => setCatId(c._id)}
                >
                  <h1
                    onClick={() => (
                      setCategoryName(c.name), setEditingUsers(true)
                    )}
                  >
                    {c.name}
                    <p className="text-sm text-gray-500 mt-2">{c.email}</p>
                  </h1>
                  <div>
                    <button
                      className="border bg-white px-3 py-1  rounded-xl"
                      onClick={() => (
                        setUserId(c._id),
                        getAUser(),
                        setCategoryName(c.name),
                        user && setEditingUsers(true)
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
        </>
      )}
    </section>
  );
};

export default EditCategories;
