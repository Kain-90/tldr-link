import React, { useCallback, useState, useRef } from 'react';
import { PopupHeader } from '@src/components/popup/PopupHeader';
import { PopupContent } from '@src/components/popup/PopupContent';
import { PopupFooter } from '@src/components/popup/PopupFooter';

interface Props {
  position: {
    x: number;
    y: number;
  };
  summary: string;
  status: 'loading' | 'success' | 'error';
  onClose: () => void;
  usageCount?: number;
}

export const SummaryPopup = ({ position, summary, status, onClose, usageCount = 0 }: Props) => {
  const [popupPosition, setPopupPosition] = useState(position);
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartPositionRef = useRef({ x: 0, y: 0 });
  const popupStartPositionRef = useRef({ x: 0, y: 0 });
  const popupRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      isDraggingRef.current = true;
      dragStartPositionRef.current = { x: e.clientX, y: e.clientY };
      popupStartPositionRef.current = popupPosition;
      e.preventDefault();
    },
    [popupPosition],
  );

  const handleDrag = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartPositionRef.current.x;
    const deltaY = e.clientY - dragStartPositionRef.current.y;
    setPopupPosition({
      x: popupStartPositionRef.current.x + deltaX,
      y: popupStartPositionRef.current.y + deltaY,
    });
  }, []);

  const handleDragEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (!popupRef.current || isPinned || isDraggingRef.current) return;

      const path = e.composedPath();
      const isClickOutside = !path.includes(popupRef.current);

      if (isClickOutside) {
        onClose();
      }
    },
    [onClose, isPinned],
  );

  React.useEffect(() => {
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleDrag, handleDragEnd, handleClickOutside]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handlePinClick = useCallback(() => {
    setIsPinned(prev => !prev);
  }, []);

  return (
    <div
      ref={popupRef}
      className={`fixed z-[9999] max-w-md rounded-lg bg-white dark:bg-gray-800 w-[400px] ${
        isHovered ? 'shadow-2xl shadow-indigo-300' : 'shadow-lg'
      }`}
      style={{
        left: popupPosition.x,
        top: popupPosition.y,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <PopupHeader
        onClose={onClose}
        onDragStart={handleDragStart}
        isPinned={isPinned}
        onPinClick={handlePinClick}
        summary={summary}
        usageCount={usageCount}
      />
      <PopupContent status={status} summary={summary} />
      <PopupFooter />
    </div>
  );
};
