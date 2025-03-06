interface StoriesProps {
  stories: { id: number; image: string }[];
  onStorySelect: (index: number) => void;
}

const Stories = ({ stories, onStorySelect }: StoriesProps) => {
  if (stories.length === 0) {
    return <p className="error-message">No stories available.</p>;
  }

  return (
    <div className="stories-container">
      {stories.map((story, index) => (
        <div
          key={story.id}
          className="story"
          onClick={() => onStorySelect(index)}
        >
          <img src={story.image} alt={`Story ${story.id}`} />
        </div>
      ))}
    </div>
  );
};

export default Stories;
