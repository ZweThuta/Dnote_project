import { ArrowUturnLeftIcon, ArrowUpTrayIcon } from "@heroicons/react/16/solid";
import { Link, Navigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

import StyleErrorMsg from "./StyleErrorMsg";
import { useEffect, useRef, useState } from "react";

const NoteForm = ({ isCreate }) => {
  const [redirect, setRedirect] = useState(false);
  const [oldNote, setOldNote] = useState({});
  const { id } = useParams();
  const fileRef = useRef();
  const [previewImg, setPreviewImg] = useState(null);

  const getOldNote = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/edit/` + id);
    if (response.status === 200) {
      const note = await response.json();
      setOldNote(note);
    } else {
      setRedirect(true);
    }
  };

  useEffect((_) => {
    if (!isCreate) {
      getOldNote();
    }
  }, []);

  const initialValues = {
    title: isCreate ? "" : oldNote.title,
    content: isCreate ? "" : oldNote.content,
    noteId: isCreate ? "" : oldNote._id,
    cover_image: isCreate ? null : oldNote.cover_image,
  };

  const SUPPORTED_FORMATS = ["image/png", "image/jpg", "image/jpeg"];
  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .min(5, "Title must have at least five words")
      .max(30, "Title is loo long")
      .required("Title must be needed"),
    content: Yup.string().min(10, "Content is too short."),
    cover_image: Yup.mixed()
      .nullable()
      .test(
        "FILE_FORMAT",
        "File type is not support!",
        (value) => !value || SUPPORTED_FORMATS.includes(value.type)
      ),
  });

  const submitHandler = async (values) => {
    let API = `${import.meta.env.VITE_API}`;
    if (isCreate) {
      API = `${import.meta.env.VITE_API}/create`;
    } else {
      API = `${import.meta.env.VITE_API}/edit`;
    }
    
    const formData = new FormData();
    formData.append("title",values.title);
    formData.append("content",values.content);
    formData.append("cover_image",values.cover_image);
    formData.append("note_id",values.note_id);

    const response = await fetch(API, {
      method: "post",
      // headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    });

    if (response.status === 201 || response.status === 200) {
      setRedirect(true);
    } else {
      toast.error("Something went wrong!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handleImageChange = (event, setFieldValue) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setPreviewImg(URL.createObjectURL(selectedImage));
      setFieldValue("cover_image", selectedImage);
    }
  };

  const clearPreImg = (setFieldValue) => {
    setPreviewImg(null);
    setFieldValue("cover_image", null);
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <section>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition="Bounce"
      />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-5">
          {isCreate ? "Create new note." : "Edit your note."}
        </h1>
        <Link to={"/"}>
          <ArrowUturnLeftIcon width={25} />
        </Link>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={NoteFormSchema}
        onSubmit={submitHandler}
        enableReinitialize={true}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="title" className="font-large block pb-2">
                Title
              </label>
              <Field
                type="text"
                name="title"
                id="title"
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg p-3"
              />
              <StyleErrorMsg name="title" />
            </div>

            <div className="mb-3">
              <label htmlFor="cover_image" className="font-large block pb-2">
                Cover Image
                <span className="text-xs font-medium">opitional</span>
              </label>
              {previewImg && (
                <p
                  className="text-sm font-medium mt-1 mb-1 cursor-pointer"
                  onClick={(_) => {
                    clearPreImg(setFieldValue);
                  }}
                >
                  Clear
                </p>
              )}
              <input
                type="file"
                name="cover_image"
                hidden
                ref={fileRef}
                onChange={(e) => {
                  handleImageChange(e, setFieldValue);
                }}
              />

              <div
                className="border border-dashed h-80 border-teal-600 flex items-center justify-center text-teal-600 cursor-pointer relative overflow-hidden"
                onClick={() => fileRef.current.click()}
              >
                <ArrowUpTrayIcon width={30} height={30} className="z-20" />
                {previewImg && (
                  <img
                    src={previewImg}
                    alt={"Preview Image"}
                    className="w-full absolute top-0 left-0 h-full object-cover opacity-65 z-10"
                  />
                )}
              </div>
              <StyleErrorMsg name="cover_image"/>
            </div>

            <div className="">
              <label htmlFor="content" className="font-large block pb-2">
                Content
              </label>
              <Field
                as="textarea"
                rows={5}
                type="text"
                name="content"
                id="content"
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg p-3"
              />
              <StyleErrorMsg name="content" />
            </div>
            {/* <Field type="text" name="noteId" id="noteId" hidden /> */}
            <div className="flex items-center gap-5 mt-3">
              <button
                type="submit"
                className="text-white bg-teal-600 py-3 font-medium w-60 text-center rounded"
              >
                {isCreate ? "Share" : "Update"}
              </button>
              <button className="text-white bg-cyan-600 py-3 font-medium w-40 text-center rounded">
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NoteForm;
