import Task from "./Task";
export const Tasks = ({ tasks, onDelete }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task task={task} onDelete={onDelete} />
      ))}
    </>
  );
};
