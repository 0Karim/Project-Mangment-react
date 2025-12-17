import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => ({
        open() {
            dialog.current.showModal();
        }
    }));

    return createPortal(
        <dialog
            ref={dialog}
            className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
        >
            <div className="p-6">
                {children}
                <form method="dialog" className="mt-4 text-right">
                    <button className="mt-4 px-4 py-2 bg-stone-800 text-stone-50 rounded-md hover:bg-stone-950">
                        {buttonCaption}
                    </button>
                </form>
            </div>
        </dialog>,
        document.getElementById('modal-root') || document.body
    );
});

export default Modal;