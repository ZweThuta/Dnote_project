import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import { Link, Navigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

import StyleErrorMsg from "./StyleErrorMsg";
import { useEffect, useState } from "react";

const NoteForm = ({ isCreate }) => {
  const [redirect, setRedirect] = useState(false);
  const [oldNote, setOldNote] = useState({});
  const { id } = useParams();

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

  };

  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .min(5, "Title must have at least five words")
      .max(30, "Title is loo long")
      .required("Title must be needed"),
    content: Yup.string().min(10, "Content is too short."),
  });

  const submitHandler = async (values) => {
    let API =`${import.meta.env.VITE_API}`;
    if(isCreate){
      API = `${import.meta.env.VITE_API}/create`
    }else{
      API = `${import.meta.env.VITE_API}/edit`
    }
      const response = await fetch(API, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.status === 201 || response.status ===200) {
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
        {() => (
          <Form action="">
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
            <Field type ="text" name="noteId" id="noteId" hidden/>
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
