import React, { useEffect, useRef, MouseEvent } from 'react';
import '@styles/common/Modal.scss';
import { CSSTransition } from 'react-transition-group';

export interface ModalOption {
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  isResponsive?: boolean;
  margin?: string;
  customClass?: string;
}

export interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  isSmallViewport: boolean;
  isPortrait?: boolean;
  isMobileRatio?: boolean;
  onClose: () => void;
  options?: ModalOption;
}

const defaultOptions: ModalOption = {
  minWidth: '300px',
  maxWidth: '90vw',
  minHeight: '200px',
  maxHeight: '90vh',
  isResponsive: true,
  margin: '20px',
  customClass: '',
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  isSmallViewport,
  isPortrait,
  isMobileRatio,
  onClose,
  options = defaultOptions,
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const modalOverlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayMouseDown = (e: MouseEvent) => {
    // 오버레이 영역 클릭 시에만 닫히도록 처리
    // 컨텐츠 내부 클릭은 아래 stopPropagation으로 막는다
    onClose();
  };

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

      if (options.customClass) {
        element.classList.add(options.customClass);
      }
    });
  };

  useEffect(() => {
    appendResponsiveClass(
      isSmallViewport,
      modalOverlayRef.current,
      modalContentRef.current,
    );
  }, [isSmallViewport, isPortrait, isMobileRatio, isOpen, options.customClass]);

  const getModalContentStyle = () => {
    const style: React.CSSProperties = {};

    if (options.isResponsive) {
      style.minWidth = options.minWidth;
      style.maxWidth = options.maxWidth;
      style.minHeight = options.minHeight;
      style.maxHeight = options.maxHeight;
      style.margin = options.margin;
    } else {
      style.width = options.minWidth;
      style.height = options.minHeight;
    }

    return style;
  };

  return (
    <CSSTransition in={isOpen} timeout={300} classNames='modal' unmountOnExit>
      <div
        ref={modalOverlayRef}
        className='modal-overlay'
        onMouseDown={
          handleOverlayMouseDown as unknown as React.MouseEventHandler<HTMLDivElement>
        }
      >
        <div
          ref={modalContentRef}
          className='modal-content'
          style={getModalContentStyle()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
