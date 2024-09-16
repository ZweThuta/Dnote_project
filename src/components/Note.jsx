import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns/formatISO9075";

const Note = ({ note, getNotes,customeAlert }) => {
  const { _id, title, content, createdAt } = note;

  const deleteNote = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/delete/` + _id, {
      method: "delete",
    });
    if(response.status === 204){
      customeAlert("Post Deleted") 
      getNotes();
    }
  };

  return (
    <>
      <div className="w-2/5 border-t-4 border-t-teal-600 shadow-lg p-3 h-fit">
        <h3 className="text-xl font-large">{title}</h3>
        <p className="text-base">{content.slice(0, 100)}</p>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium mt-2 border-t p-2">
            {formatISO9075(new Date(createdAt), { representation: "date" })}
          </p>
          <div className="flex items-center justify-end gap-3">
            <Link to={"/notes/" + _id}>
              <EyeIcon width={24} className="text-gray-600" />
            </Link>
            <Link to={"/edit/" + _id}>
              <PencilSquareIcon width={24} className="text-cyan-600" />
            </Link>
            <TrashIcon
              onClick={deleteNote}
              width={24}
              className="text-red-600"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
