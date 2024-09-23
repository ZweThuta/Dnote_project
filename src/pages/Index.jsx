import { useEffect, useState } from "react";
import Note from "../components/Note";
import Plusicon from "../components/Plusicon";
import { RevolvingDot } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getNotes = async (pageNum) => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API}/notes?page=${pageNum}`
    );
    const { notes, totalNotes, totalPages } = await response.json();
    setTotalPages(totalPages);
    setNotes(notes);
    setLoading(false);
  };

  useEffect(
    (_) => {
      getNotes(currentPage);
    },
    [currentPage]
  );

  const handlePre = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const customeAlert = (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <section className="flex gap-6 px-10 py-10 flex-wrap">
      {!loading && notes.length > 0 ? (
        <>
          {notes.map((note) => (
            <Note
              key={note._id}
              note={note}
              getNotes={getNotes}
              customeAlert={customeAlert}
            />
          ))}
          <div className="w-full flex items-center justify-center gap-4">
            {currentPage > 1 && (
              <button
                type="button"
                onClick={handlePre}
                className="text-white font-medium bg-teal-600 px-3 py-1"
              >
                Previous
              </button>
            )}

            {currentPage < totalPages && (
              <button
                type="button"
                onClick={handleNext}
                className="text-white font-medium bg-teal-600 px-3 py-1"
              >
                Next
              </button>
            )}
          </div>
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
      />
    </section>
  );
};

export default Index;
