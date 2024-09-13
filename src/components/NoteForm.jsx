import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import StyleErrorMsg from "./StyleErrorMsg";
const NoteForm = ({ isCreate }) => {
  const initialValue = {
    title: "",
    content: "",
  };
  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .min(5, "Title must have at least five words")
      .max(30, "Title is loo long")
      .required("Title must be needed"),
      content: Yup.string().min(10, "Content is too short."),
  });

  // const validate = (values) => {
  //   const errors = {};

  //   if (values.title.trim().length < 5) {
  //     errors.title = "Title must have at least five words.";
  //   }

  //   if (values.content.trim().length < 10) {
  //     errors.content = "Content must have at least ten words.";
  //   }
  //   return errors;
  // };
  const submitHandler = (values) => {
    console.log(values);
  };
  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-5">
          {isCreate ? "Create new note." : "Edit your note."}
        </h1>
        <Link to={"/"}>
          <ArrowUturnLeftIcon width={25} />
        </Link>
      </div>

      <Formik
        initialValues={initialValue}
        validationSchema={NoteFormSchema}
        onSubmit={submitHandler}
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
            <div className="flex items-center gap-5 mt-3">
              <button
                type="submit"
                className="text-white bg-teal-600 py-3 font-medium w-60 text-center rounded"
              >
                Save
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
