
// import { useState, useEffect } from "react";
// import Stories from "./components/Stories";
// import StoryViewer from "./components/StoryViewer";
// import { fetchStories } from "./components/StoryService";

// const App = () => {
//   const [stories, setStories] = useState<{ id: number; image: string }[]>([]);
//   const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   // Monitor screen width to enforce mobile-only access
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const loadStories = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const fetchedStories = await fetchStories();
//         if (fetchedStories.length === 0) {
//           setError("No stories available.");
//         } else {
//           setStories(fetchedStories);
//         }
//       } catch (err) {
//         setError("Failed to load stories.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadStories();
//   }, []);

//   const openStory = (index: number) => {
//     setSelectedStoryIndex(index);
//   };

//   const handleNext = () => {
//     setSelectedStoryIndex((prev) => (prev !== null && prev < stories.length - 1 ? prev + 1 : prev));
//   };

//   const handlePrev = () => {
//     setSelectedStoryIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
//   };

//   const handleClose = () => {
//     setSelectedStoryIndex(null);
//   };

//   if (!isMobile) {
//     return <h2 style={{ textAlign: "center", marginTop: "20px" }}>This app is only available on mobile devices.</h2>;
//   }

//   return (
//     <div>
//       {loading ? (
//         <p>Loading stories...</p>
//       ) : error ? (
//         <p className="error-message">{error}</p>
//       ) : selectedStoryIndex === null ? (
//         <Stories stories={stories} onStorySelect={openStory} />
//       ) : (
//         <StoryViewer
//           key={selectedStoryIndex}
//           story={stories[selectedStoryIndex]}
//           onClose={handleClose}
//           onNext={handleNext}
//           onPrev={handlePrev}
//           isFirst={selectedStoryIndex === 0}
//           isLast={selectedStoryIndex === stories.length - 1}
//         />
//       )}
//     </div>
//   );
// };

// export default App;

import { useState, useEffect } from "react";
import Stories from "./components/Stories";
import StoryViewer from "./components/StoryViewer";
import { fetchStories } from "./components/StoryService";

const App = () => {
  const [stories, setStories] = useState<{ id: number; image: string }[]>([]);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 768px)").matches);

  // Monitor screen width to enforce mobile-only access
  useEffect(() => {
    const handleResize = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadStories = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedStories = await fetchStories();
        setStories(fetchedStories.length > 0 ? fetchedStories : []);
        if (fetchedStories.length === 0) setError("No stories available.");
      } catch (err) {
        setError("Failed to load stories.");
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, []);

  const openStory = (index: number) => setSelectedStoryIndex(index);
  const handleNext = () => setSelectedStoryIndex((prev) => (prev !== null && prev < stories.length - 1 ? prev + 1 : prev));
  const handlePrev = () => setSelectedStoryIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  const handleClose = () => setSelectedStoryIndex(null);

  if (!isMobile) {
    return <h2 style={{ textAlign: "center", marginTop: "20px" }}>This app is only available on mobile devices.</h2>;
  }

  return (
    <div className="app-container">
      {loading ? (
        <p>Loading stories...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : selectedStoryIndex === null ? (
        <Stories stories={stories} onStorySelect={openStory} />
      ) : (
        <StoryViewer
          key={selectedStoryIndex}
          story={stories[selectedStoryIndex]}
          onClose={handleClose}
          onNext={handleNext}
          onPrev={handlePrev}
          isFirst={selectedStoryIndex === 0}
          isLast={selectedStoryIndex === stories.length - 1}
        />
      )}
    </div>
  );
};

export default App;
