import React, { useEffect, useRef, MouseEvent } from 'react';
import '@styles/common/Modal.scss';
import { CSSTransition } from 'react-transition-group';

export interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  isSmallViewport: boolean;
  isPortrait?: boolean;
  isMobileRatio?: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  isSmallViewport,
  isPortrait,
  isMobileRatio,
  onClose,
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const modalOverlayRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent) => {
    if (!modalContentRef.current) return;

    const { clientX, clientY } = e;
    const { left, right, top, bottom } =
      modalContentRef.current.getBoundingClientRect();

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

  const appendResponsiveClass = (
    isSmallViewport: boolean,
    ...elements: (HTMLDivElement | null)[]
  ) => {
    elements?.forEach((element) => {
      if (!element) return;

      if (!isSmallViewport) {
        element.classList.add('desktop');
        element.classList.remove('portrait');
        element.classList.remove('landscape');
        return;
      } else if (isMobileRatio || isPortrait) {
        element.classList.add('portrait');
        element.classList.remove('landscape');
        element.classList.remove('desktop');
      } else {
        element.classList.add('landscape');
        element.classList.remove('portrait');
        element.classList.remove('desktop');
      }
    });
  };

  useEffect(() => {
    appendResponsiveClass(
      isSmallViewport,
      modalOverlayRef.current,
      modalContentRef.current,
    );
  }, [isSmallViewport, isPortrait, isMobileRatio, isOpen]);

  return (
    <CSSTransition in={isOpen} timeout={300} classNames='modal' unmountOnExit>
      <div ref={modalOverlayRef} className='modal-overlay'>
        <div ref={modalContentRef} className='modal-content'>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
