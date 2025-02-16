import { TbListCheck } from "react-icons/tb";
import { useGetOneTaskQuery } from "../api/tasks/tasksApi";
import Drawer, { DrawerProps } from "./ui/Drawer";
import Loader from "./ui/Loader";
import PriorityBlock from "./PriorityBlock";
import SubTaskItem from "./SubTaskItem";
import { calculatePercent } from "../utils/calculatePercent";

type TaskDrawerProps = DrawerProps & { taskId: number };

const TaskDrawer = ({ taskId, ...drawerProps }: TaskDrawerProps) => {
  const { data, isLoading } = useGetOneTaskQuery(taskId, {
    skip: !drawerProps.open,
  });

  if (isLoading) {
    return (
      <Drawer {...drawerProps}>
        <div className="h-screen flex justify-center items-center">
          <Loader variant="default" />
        </div>
      </Drawer>
    );
  }

  const doneSubtasks = data?.subtasks.filter((s) => s.done) || [];
  const percentProgress = data
    ? calculatePercent(doneSubtasks.length, data.subtasks.length)
    : 0;

  return (
    <Drawer {...drawerProps}>
      {data && <PriorityBlock data={data?.priority} />}
      <h2 className="mb-4 text-xl">{data?.title}</h2>
      <p className="mb-10 font-light">{data?.description}</p>

      <h3 className="font-bold">To Do:</h3>
      <div className="p-3">
        <div className="mb-3 flex justify-between">
          <div className="flex gap-x-2">
            <TbListCheck size={24} />
            <span>Sub Tasks</span>
          </div>
          <span>
            {doneSubtasks.length}/{data?.subtasks.length}
          </span>
        </div>
        <div className="mb-7 w-full relative h-1 bg-tm-gray rounded-lg">
          <div
            className="h-full bg-tm-primary/30 rounded-lg"
            style={{ width: `${percentProgress}%` }}
          />
        </div>
        {data?.subtasks.map((s) => (
          <SubTaskItem data={s} key={s.id} />
        ))}
      </div>
    </Drawer>
  );
};

export default TaskDrawer;
