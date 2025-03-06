import { useEffect, useState, useRef } from "react";
import "./StoryViewer.css";

interface StoryViewerProps {
  story: { id: number; image: string };
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const StoryViewer = ({ story, onClose, onNext, onPrev, isFirst, isLast }: StoryViewerProps) => {
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setProgress(0);
    
    intervalRef.current = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : prev));
    }, 50);

    timeoutRef.current = setTimeout(() => {
      if (!isLast) onNext();
    }, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [story]);

  const handleStoryClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const clickX = e.clientX;
    const imageWidth = e.currentTarget.clientWidth;

    if (clickX < imageWidth / 3 && !isFirst) {
      onPrev();
    } else if (clickX > (2 * imageWidth) / 3 && !isLast) {
      onNext();
    } else {
      onClose();
    }
  };

  return (
    <div className="story-viewer">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <button className="close-btn" onClick={onClose}>✕</button>
      <img
        src={story.image}
        alt="Story"
        className="story-image"
        onClick={handleStoryClick}
      />
    </div>
  );
};

export default StoryViewer;