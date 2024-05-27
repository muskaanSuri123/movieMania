const Movielist = ({ movies, favourite, handlefavclick, Overlaycomponent }) => {
  return (
    <div className="movielist">
      {movies?.map((movie, index) => (
        <div className="content" key={index}>
          <img src={movie.Poster}></img>

          <div
            onClick={() => handlefavclick(movie)}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <Overlaycomponent />{" "}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movielist;
