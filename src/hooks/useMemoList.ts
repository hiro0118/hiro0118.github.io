import { FC, useState } from "react";

export const useMemoList = () => {
  const [memos, setMemos] = useState<string[]>([]);

  const addToDo = (memo: string) => {
    if (!!memo) {
      const newMemos = [...memos];
      newMemos.push(memo);
      setMemos(newMemos);
    }
  };

  const deleteToDo = (index: number) => {
    const newMemos = [...memos];
    newMemos.splice(index, 1);
    setMemos(newMemos);
  }

  return { memos, addToDo, deleteToDo };
}