import { ErrorMessage } from "formik";

const StyleErrorMsg = ({name}) => {
  return (
    <div className="text-red-600 font-medium ">
      <ErrorMessage name={name}/>
    </div>
  );
};

export default StyleErrorMsg;
