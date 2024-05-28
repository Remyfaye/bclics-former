import Image from "next/image";
import firebase from "firebase/compat/app";
import toast from "react-hot-toast";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Add Firebase storage
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAphBd4q0wtjCajhKeFG0VNVuUOJnFa6Zc",
  authDomain: "foodhunch-421016.firebaseapp.com",
  projectId: "foodhunch-421016",
  storageBucket: "foodhunch-421016.appspot.com",
  messagingSenderId: "178540139933",
  appId: "1:178540139933:web:170ed898a4aa110897cb74",
  measurementId: "G-C3GRZ38TYM",
};

firebase.initializeApp(firebaseConfig);

const UploadImage = ({
  menu,
  image,
  setImage,
  setDisabled,
  setIsChosingImage,
}) => {
  const handleFileChange = async (e) => {
    setDisabled(true);
    setIsChosingImage(true);

    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      const uploadPromise = fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadUrl) => {
          console.log(downloadUrl);
          setImage(downloadUrl);
          setIsChosingImage(false);
        });
      });

      await toast.promise(uploadPromise, {
        loading: "uploading...",
        success: "upload complete",
        error: "an error occured, please try again",
      });

      setDisabled(false);
    } else {
      console.log("no file chosen");
    }
  };
  return (
    <div>
      <div
        className={
          menu
            ? "w-[20rem] mx-auto lg:mx-0 flex mb-3 lg:flex flex-col items-center rounded-xl bg-gray-300  lg:w-[12rem] h-[8rem]"
            : "mx-auto lg:mx-0 mb-10 lg:flex flex-col items-center rounded-full bg-red-200 w-[7.5rem] h-[7.5rem]"
        }
      >
        {image ? (
          <>
            <Image
              className={
                menu
                  ? " w-full max-h-[8rem] lg:h-[25rem] rounded-xl object-contain "
                  : "w-full  rounded-full object-contain min-h-[7.5rem] max-h-[7.5rem]"
              }
              src={image}
              alt="img"
              width={300}
              height={300}
              // layout="fill"
              objectFit="contain"
            />{" "}
          </>
        ) : (
          <>
            <div className=" p-3 text-center mx-auto">No image</div>
          </>
        )}
      </div>

      <label
        className={
          image
            ? "mt-5 lg:mt-0 mx-auto flex justify-center shadow-xl border py-1 px-9 w-[2rem]  rounded-lg"
            : "mx-auto flex mt-3 justify-center shadow-xl border py-1 px-9 w-[2rem]  rounded-lg "
        }
      >
        <input
          type="file"
          // disabled={isUploading}
          hidden
          onChange={handleFileChange}
        />
        <p className="">{menu ? "Add " : "upload"} </p>
      </label>
    </div>
  );
};

export default UploadImage;
