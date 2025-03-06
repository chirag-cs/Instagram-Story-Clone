import axios from "axios";

const PICSUM_URL = "https://picsum.photos/v2/list";

export const fetchStories = async () => {
  try {
    const response = await axios.get(PICSUM_URL, {
      params: { limit: 10 },
    });

    console.log("Fetched stories:", response.data);

    return response.data.map((photo: any) => ({
      id: photo.id,
      image: `https://picsum.photos/id/${photo.id}/500/800`,
    }));
  } catch (error) {
    console.error("Error fetching stories:", error);
    return [];
  }
};
