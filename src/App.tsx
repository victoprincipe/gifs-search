import { useEffect, useState } from "react";
import { GifModal } from "./components/GifModal";

function App() {
  const [gifs, setGifs] = useState([]);
  const [value, setValue] = useState<string>("");
  const [selectedGifIndex, setSelectedGifIndex] = useState(-1);

  const selectedGif = gifs?.[selectedGifIndex]?.images?.original;

  useEffect(() => {
    fetch(
      `https://api.giphy.com/v1/gifs/search?q=${value}&api_key=${import.meta.env.VITE_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setGifs(res.data);
      });
  }, [value]);

  const handleNext = () => {
    if(selectedGifIndex < gifs.length - 1) {
      setSelectedGifIndex((i) => i += 1);
    }
  }

  const handlePrevious = () => {
    if(selectedGifIndex > 0) {
      setSelectedGifIndex((i) => i -= 1);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-6xl mb-4">Gifs Search</h1>
      <div className="flex flex-row gap-x-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          className="border"
        />
      </div>
      <div className="flex flex-row flex-wrap mt-6 gap-2">
        {gifs.map((g, index) => (
          <button
            onClick={() => setSelectedGifIndex(index)}
          >
            <img
              id={g.id}
              alt={g.title}
              src={g.images.original.url}
              width={400}
              height={400}
            />
          </button>
        ))}
      </div>
      <GifModal
        open={selectedGifIndex >= 0}
        onClose={() => setSelectedGifIndex(-1)}
        src={selectedGif?.url}
        width={selectedGif?.width}
        height={selectedGif?.height}
        onNext={handleNext}
        onPrevious={handlePrevious}
        hasNext={selectedGifIndex < gifs.length - 1}
        hasPrevious={selectedGifIndex > 0}
      />
    </div>
  );
}

export default App;
