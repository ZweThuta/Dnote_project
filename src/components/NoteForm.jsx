import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
const NoteForm = ({ isCreate }) => {
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
      <form action="">
        <div className="mb-3">
          <label htmlFor="title" className="font-large block pb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg p-3"
          />
        </div>
        <div className="">
          <label htmlFor="description" className="font-large block pb-2">
            Description
          </label>
          <textarea
            rows={5}
            type="text"
            name="description"
            id="description"
            className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg p-3"
          />
        </div>
        <div className="flex items-center gap-5 mt-3">
          <button className="text-white bg-teal-600 py-3 font-medium w-60 text-center rounded">
            Save
          </button>
          <button className="text-white bg-cyan-600 py-3 font-medium w-40 text-center rounded">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default NoteForm;
