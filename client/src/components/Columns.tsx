import { useParams } from "react-router";
import { useGetColumnsQuery } from "../api/boards/boardsApi";
import Button from "./Button";
import { TbPlus } from "react-icons/tb";
import Loader from "./Loader";
import ColumnItem from "./ColumnItem";

const Columns = () => {
  const { boardId } = useParams();

  const { data, isLoading } = useGetColumnsQuery(parseFloat(boardId as string));

  console.log(data);

  return (
    <div className="flex-1 flex flex-col bg-tm-gray">
      <div className="px-12 py-6 flex justify-end">
        <Button size="default" variant="primary">
          <TbPlus size={24} />
          Add Task
        </Button>
      </div>
      <div className="px-12 flex-1 flex gap-x-4 overflow-auto">
        {isLoading ? (
          <div className="flex justify-center">
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
