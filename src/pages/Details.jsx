import { Link } from "react-router-dom";

const Details = () => {
  return (
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
        <h3 className="text-3xl font-large">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h3>
        <p className="text-base mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
          eligendi repellendus aspernatur eaque assumenda nulla est nemo, sequi
          commodi expedita velit necessitatibus error voluptatum ut eos dolor
          soluta eius? Nesciunt!
        </p>
      </div>
    </section>
  );
};

export default Details;
