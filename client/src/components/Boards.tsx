import React from "react";
import { useGetBoardsQuery } from "../api/boards/boardsApi";
import { NavLink } from "react-router-dom";

const Boards = () => {
  const { data } = useGetBoardsQuery();

  return (
    <div className="flex-1">
      <h2 className="mb-7 text-2xl text-tm-black-300 font-bold">All Boards</h2>
      <ul className="">
        {data?.map((board) => (
          <li className="block">
            <NavLink
              to={`/${board.id}`}
              className="block py-3 px-5 rounded-3xl text-lg text-tm-black-300"
            >
              {board.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Boards;
