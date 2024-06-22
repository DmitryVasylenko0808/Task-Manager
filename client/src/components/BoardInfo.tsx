import { useParams } from "react-router";
import { useGetOneBoardQuery } from "../api/boards/boardsApi";
import Button from "./Button";
import { TbPlus, TbTrash } from "react-icons/tb";
import { useModal } from "../hooks/useModal";
import DeleteBoardModal from "./DeleteBoardModal";

const BoardInfo = () => {
  const deleteBoardModal = useModal();

  const { boardId } = useParams();

  const { data } = useGetOneBoardQuery(parseFloat(boardId as string));

  return (
    <div className="py-8 px-12 flex items-center justify-between bg-white border-b">
      <h2 className="text-2xl font-bold">{data?.title}</h2>
      <div className="flex gap-x-4">
        <Button size="default" variant="primary">
          <TbPlus size={24} />
          Add Column
        </Button>
        <Button
          size="default"
          variant="secondary"
          onClick={deleteBoardModal.onOpen}
        >
          <TbTrash size={24} />
          Delete Board
        </Button>
      </div>
      {data && <DeleteBoardModal board={data} {...deleteBoardModal} />}
    </div>
  );
};

export default BoardInfo;
