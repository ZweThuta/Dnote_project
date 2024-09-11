import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
const Note = () => {
  return (
    <>
      <div className="w-2/5 border-t-4 border-t-teal-600 shadow-lg p-3">
        <h3 className="text-xl font-large">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h3>
        <p className="text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
          eligendi repellendus aspernatur eaque assumenda nulla est nemo, sequi
          commodi expedita velit necessitatibus error voluptatum ut eos dolor
          soluta eius? Nesciunt!
        </p>
        <div className="flex items-center justify-end gap-3">
          <Link to={"/notes/1"}>
          <EyeIcon width={24} className="text-gray-600" />
          </Link>
          <Link to={"/edit/1"}>
          <PencilSquareIcon width={24} className="text-cyan-600" />
          </Link>
          <TrashIcon width={24} className="text-red-600" />
        </div>
      </div>
    </>
  );
};

export default Note;
