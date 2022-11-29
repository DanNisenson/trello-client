import axios from "axios";
import React, { useState, useEffect } from "react";
import Board from "./Board";
import Lists from "./Lists";
import { useAppContext } from "../context/keys";
import "../assets/css/UserBoards.css";

const UserBoards = () => {
  const context = useAppContext();
  const [userBoards, setUserBoards] = useState([]);
  const [currentLists, setCurrentLists] = useState([]);
  const [currentCards, setCurrentCards] = useState([]);

  // get boards on load
  useEffect(() => {
    console.log(context)
    const getLists = async () => {
      const resp = await axios.get(
        `https://api.trello.com/1/members/me/boards?fields=id,name,url&key=${context.keys.apiKey}&token=${context.keys.token}`
      );
      setUserBoards(resp.data);
    };
    getLists();
    
  }, []);

  // get lists and cards on Board component click
  const showLists = (id) => {
    const getLists = async () => {
      const resp = await axios.get(
        `https://api.trello.com/1//boards/${id}/lists?&key=${context.keys.apiKey}&token=${context.keys.token}`
      );
      setCurrentLists(resp.data);
    };
    getLists();
    const getCards = async () => {
      const resp = await axios.get(
        `https://api.trello.com/1//boards/${id}/cards?&key=${context.keys.apiKey}&token=${context.keys.token}`
      );
      setCurrentCards(resp.data);
    };
    getCards();
  };

  return (
    <>
    {/* boards list */}
    <div className="boards">
      <h1>Boards</h1>
        {userBoards
          .map((e, i) => (
            <div className="board-link" onClick={() => showLists(e.id)}>{e.name}</div>

          ))
          .reverse()}
      </div>
      {/* check if currentLists true -> render Lists and Cards */}
      {currentLists[0] ? <Lists currentLists={currentLists} currentCards={currentCards} /> : null}
      </>
  );
};

export default UserBoards;
