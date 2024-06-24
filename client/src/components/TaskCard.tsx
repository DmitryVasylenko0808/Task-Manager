import { Task } from "../api/boards/dto/GetColumnsDTO";
import { useDrawer } from "../hooks/useDrawer";
import TaskDrawer from "./TaskDrawer";
import PriorityBlock from "./PriorityBlock";
import { useRef, useState } from "react";
import Button from "./ui/Button";
import { TbDotsVertical, TbEdit, TbTrash } from "react-icons/tb";
import { useDeleteTaskMutation } from "../api/tasks/tasksApi";
import { useClickOutside } from "../hooks/useClickOutside";
import { useModal } from "../hooks/useModal";
import { useParams } from "react-router";
import EditTaskModal from "./Modals/EditTaskModal";

type TaskCardProps = {
  data: Task;
};

const TaskCard = ({ data }: TaskCardProps) => {
  const { boardId } = useParams();

  const taskDrawer = useDrawer();
  const editModal = useModal();

  const ref = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const [triggerDeleteTask] = useDeleteTaskMutation();

  useClickOutside(ref, () => setOpenMenu(false));

  const handleClickTOpenMenu = () => setOpenMenu(true);

  const handleClickDeleteTask = () => {
    triggerDeleteTask(data.id)
      .unwrap()
      .catch((err) => alert(err.data.message));
  };

  return (
    <li className="block">
      <div className="p-4 bg-white rounded-xl shadow-md">
        <div className="flex justify-between">
          <PriorityBlock data={data.priority} />
          <div className="relative">
            <Button
              size="default"
              variant="terciary"
              className="p-0"
              onClick={handleClickTOpenMenu}
            >
              <TbDotsVertical size={18} />
            </Button>
            {openMenu && (
              <div
                className="absolute top-3 left-3 z-10 bg-white shadow-lg rounded-lg"
                ref={ref}
              >
                <Button
                  size="default"
                  variant="terciary"
                  onClick={editModal.onOpen}
                >
                  <TbEdit size={24} />
                  Edit
                </Button>
                <Button
                  size="default"
                  variant="terciary"
                  onClick={handleClickDeleteTask}
                >
                  <TbTrash size={24} />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
        <h4 className="cursor-pointer" onClick={taskDrawer.onOpen}>
          {data.title}
        </h4>
      </div>
      <TaskDrawer taskId={data.id} {...taskDrawer} />
      {boardId && (
        <EditTaskModal
          boardId={parseFloat(boardId)}
          taskId={data.id}
          {...editModal}
        />
      )}
    </li>
  );
};

export default TaskCard;
