import Note from "../components/Note";
import Plusicon from "../components/Plusicon";
const Index = () => {
  return (
    <section className="flex gap-6 px-10 py-10 flex-wrap">
      <Note />
      <Note />
      <Note />
      <Note />
      <Plusicon/>
    </section>
  );
};

export default Index;
