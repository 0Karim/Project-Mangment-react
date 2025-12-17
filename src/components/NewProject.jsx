import { useRef, useState } from 'react';
import Input from "./Input.jsx";
import Modal from './Modal.jsx';

export default function NewProject({onAdd, onCancel}){    

    const title = useRef();
    const description = useRef();
    const dueDate = useRef();
    const modal = useRef();

    function handleSave(){
        const newProject = {
            title: title.current.value,
            description: description.current.value,
            dueDate: dueDate.current.value,
        }
        
        if(newProject.title.trim() === '' || 
        newProject.description.trim() === '' || 
        newProject.dueDate.trim() === '')
        {
            modal.current.open();
            return;
        }

        //Validarion could be added here        
        onAdd(newProject);
    };

    return(
        <>
            <Modal ref={modal} buttonCaption="Close">
                <h2 className='text-xl font-bold text-stone-700 my-4'>
                    Invalid Input
                </h2>
                <p className='text-stone-600 mb-4'>
                    Look you like you forget enter value
                </p>
                <p className='text-stone-600 mb-4'>
                    Please make sure to enter all fields
                </p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button 
                            className="text-stone-800 hover:text-stone-950"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button 
                            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </li>
                </menu>
                <Input 
                    type="text"
                    label="Title" 
                    ref={title}
                />
                <Input 
                    label="Description" 
                    textarea 
                    ref={description}
                />
                <Input 
                    type="date"
                    label="Due Date" 
                    ref={dueDate}
                />
            </div>        
        </>
    );
}