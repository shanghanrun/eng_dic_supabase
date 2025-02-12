import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from 'react-bootstrap';
import WordCard from "./WordCard";
import dataStore from "../store/dataStore";

const SortableItem = ({ word }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: word.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    listStyle: "none",
    padding: "8px",
    // border: "1px solid #ccc",
    margin: "4px 0",
    // background: "#f9f9f9",
    cursor: "grab",
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <WordCard word={word} />
    </li>
  );
};

const WordList = () => {
  const { wordList, getList, setWordList, sortWord } = dataStore();
  const [asc, setAsc] = useState(true);
  // const [isEditing, setIsEditing] = useState(false);
  // const [doneEdit, setDoneEdit] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  // const handleDragEnd = (event) => {
  //   const { active, over } = event;
  //   if (!over || active.id === over.id) return;

  //   const oldIndex = wordList.findIndex((w) => w.id === active.id);
  //   const newIndex = wordList.findIndex((w) => w.id === over.id);

  //   setWordList(arrayMove(wordList, oldIndex, newIndex));
  // };

  const sort=()=>{
		sortWord(asc);
		setAsc(!asc);
  }

  return (
    <div>
      <div>
        <h2 onClick={sort} className="green">Words</h2>
        {/* {isEditing? (<Button variant="success" onClick={()=>setDoneEdit(true)}>확인</Button>) : 
          (<Button variant="success" onClick={()=>setIsEditing(true)}>수정</Button>)} */}
      </div>

            {wordList.map((word) => (
              <WordCard key={word.id} word={word}  />
            ))}

    </div>
  );
};

export default WordList;
