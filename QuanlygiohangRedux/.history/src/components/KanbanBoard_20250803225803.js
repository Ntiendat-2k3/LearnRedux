import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { moveTask } from "../store/kanbanSlice";

export default function KanbanBoard() {
  const dispatch = useDispatch();
  const { boards, currentBoardId, tasks } = useSelector(
    (state) => state.kanban
  );
  const board = boards[currentBoardId];

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    dispatch(moveTask({ source, destination }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-4 overflow-x-auto">
        {board.listOrder.map((listId) => {
          const list = board.lists[listId];
          return (
            <Droppable droppableId={list.id} key={list.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white w-64 p-4 rounded shadow"
                >
                  <h3 className="font-semibold mb-2">{list.title}</h3>
                  {list.taskIds.map((taskId, index) => (
                    <Draggable key={taskId} draggableId={taskId} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-100 p-2 mb-2 rounded"
                        >
                          {tasks[taskId].content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}
