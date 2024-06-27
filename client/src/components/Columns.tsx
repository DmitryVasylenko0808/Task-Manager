import { useParams } from "react-router";
import { useGetColumnsQuery } from "../api/boards/boardsApi";
import Loader from "./ui/Loader";
import ColumnItem from "./ColumnItem";
import AddTaskButton from "./AddTaskButton";

const Columns = () => {
  const { boardId } = useParams();

  const { data, isLoading } = useGetColumnsQuery(parseFloat(boardId as string));

  return (
    <div className="flex-1 flex flex-col bg-tm-gray">
      <div className="px-12 py-6 flex justify-end">
        <AddTaskButton />
      </div>
      <div className="px-12 flex-1 flex gap-x-4 overflow-auto">
        {isLoading ? (
          <div className="w-full flex justify-center">
            <Loader variant="default" />
          </div>
        ) : (
          data?.map((col) => <ColumnItem data={col} key={col.id} />)
        )}
      </div>
    </div>
  );
};

export default Columns;
