import React, { useEffect, useRef, MouseEvent } from 'react';
import '@styles/Modal.scss';
import { CSSTransition } from 'react-transition-group';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent) => {
    if (!modalRef.current) return;

    const { clientX, clientY } = e;
    const { left, right, top, bottom } =
      modalRef.current.getBoundingClientRect();

    if (
      clientX < left ||
      clientX > right ||
      clientY < top ||
      clientY > bottom
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener(
        'mousedown',
        handleMouseDown as unknown as EventListener,
      );
    } else {
      document.removeEventListener(
        'mousedown',
        handleMouseDown as unknown as EventListener,
      );
    }

    return () => {
      document.removeEventListener(
        'mousedown',
        handleMouseDown as unknown as EventListener,
      );
    };
  }, [isOpen]);

  return (
    <CSSTransition in={isOpen} timeout={300} classNames='modal' unmountOnExit>
      <div className='modal-overlay'>
        <div className='modal-content' ref={modalRef}>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
