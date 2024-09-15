import { useEffect, useState } from "react";
import Note from "../components/Note";
import Plusicon from "../components/Plusicon";
import { RevolvingDot } from "react-loader-spinner";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNotes = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API}/notes`);
    const notes = await response.json();
    setNotes(notes);
    setLoading(false);
  };
  
  useEffect((_) => {
    getNotes();
  }, []);

  return (
    <section className="flex gap-6 px-10 py-10 flex-wrap">
      {!loading && notes.length > 0 ? (
        <>
          {notes.map((note) => (
            <Note key={note._id} note={note} />
          ))}
        </>
      ) : (
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
      )}
      <Plusicon />
    </section>
  );
};

export default Index;
