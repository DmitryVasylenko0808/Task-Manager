import BoardInfo from "../components/BoardInfo";
import Columns from "../components/Columns";

const BoardDetailsPage = () => {
  return (
    <div className="h-full flex flex-col">
      <BoardInfo />
      <Columns />
    </div>
  );
};

export default BoardDetailsPage;
