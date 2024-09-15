import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RevolvingDot } from "react-loader-spinner";
import { UserIcon, CalendarDaysIcon } from "@heroicons/react/16/solid";
import { formatISO9075 } from "date-fns/formatISO9075";

const Details = () => {
  const { id } = useParams();
  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNote = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API}/notes/${id}`);
    const note = await response.json();
    setNote(note);
    setLoading(false);
  };

  useEffect((_) => {
    getNote();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="flex justify-center items-center m-auto">
            <RevolvingDot
              visible={true}
              height="50"
              width="50"
              color="teal"
              ariaLabel="revolving-dot-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </>
      ) : (
        <section className="px-10 mt-10">
          <div className="text-right">
            <Link
              to={"/"}
              className="text-teal-600 border border-teal-600 px-3 py-2"
            >
              Back
            </Link>
          </div>
          <div className="w-2/5 border-t-4 border-t-teal-600 shadow-lg p-3 mt-4">
            <h3 className="text-3xl font-large">{note.title}</h3>
            <div>
              <p className="flex items-center gap-2 font-medium text-gray-600">
                <UserIcon className="w-5 h-5" />
                {note.creator}
              </p>
              {note.createdAt && (
                <p className="flex items-center gap-2 font-medium text-gray-600">
                  <CalendarDaysIcon className="w-5 h-5" />
                  {formatISO9075(new Date(note.createdAt), {
                    representation: "date",
                  })}
                </p>
              )}
            </div>
            <p className="text-base mt-2">{note.content}</p>
          </div>
        </section>
      )}
    </>
  );
};

export default Details;
