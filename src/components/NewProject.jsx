import { forwardRef, useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({ onCancel, onSave }) {
  const modal = useRef();

  const title = useRef();
  const description = useRef();
  const date = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDate = date.current.value;

    if (
      enteredTitle.trim() == "" ||
      enteredDescription.trim() == "" ||
      enteredDate.trim() == ""
    ) {
      modal.current.open();
      return;
    }

    onSave({
      title: enteredTitle,
      description: enteredDescription,
      date: enteredDate,
      id: Math.random(),
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Close">
        <h2 className="text-xl font-bold text-stone-800 my-4">Invalid input</h2>
        <p className="text-stone-700 mb-4">Looks like you forgot to enter a value.</p>
        <p className="text-stone-700 mb-4">Please make sure you provide a valid value for every input field.</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={onCancel}
              className="px-6 py-2 text-stone-800 hover:text-stone-950"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-stone-800 text-stone-50 rounded-md hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <div className="flex flex-col">
          <Input ref={title} label="Title" type="text" />
          <Input ref={description} label="Description" textArea />
          <Input ref={date} label="Due Date" type="date" />
        </div>
      </div>
    </>
  );
}
