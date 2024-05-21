import React, { useEffect, useRef } from 'react';
import '@styles/Modal.scss';
import { CSSTransition } from 'react-transition-group';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
  const modalRef = useRef(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    console.log(`isOpen:${isOpen}`);
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <CSSTransition in={isOpen} timeout={300} classNames='modal' unmountOnExit>
      <div className='modal-overlay'>
        <div className='modal-content' ref={modalRef}>
          {children}
          <button className='close-button' onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
