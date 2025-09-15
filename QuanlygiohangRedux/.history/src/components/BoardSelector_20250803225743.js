import { useSelector, useDispatch } from "react-redux";
import { setCurrentBoard } from "../store/kanbanSlice";

export default function BoardSelector() {
  const { boards, boardOrder, currentBoardId } = useSelector(
    (state) => state.kanban
  );
  const dispatch = useDispatch();

  return (
    <div className="p-4 flex gap-2">
      {boardOrder.map((boardId) => (
        <button
          key={boardId}
          className={`px-4 py-2 rounded ${
            currentBoardId === boardId
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => dispatch(setCurrentBoard(boardId))}
        >
          {boards[boardId].title}
        </button>
      ))}
    </div>
  );
}
