import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import PageTitle from "../components/PageTitle";
import CharacterListItem from "../components/CharacterListItem";
import assets from "../assets";
import LoadingListItem from "../components/LoadingListItem";

const style = {
  container: `container text-white w-full mx-auto my-5`,
  containerInner: `mx-[4%] md:mx-[3%] pt-4 md:pt-10`,
  emptyContainer: `mt-10 relative flex justify-center align-center`,
  emptyImageContainer: `h-[60vh]`,
  emptyImage: `max-h-full max-w-full opacity-30`,
  emptyText: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-[#5a5c5d]`,
};

const Search = ({ query }) => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const [isFetched, setIsFetched] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsFetched(false);
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${query}&page=${currentPage}`
      );
      const charactersData = await response.json();
      setCharacters(charactersData.results);
      setIsFetched(true);
      setLastPage(
        Math.ceil(
          charactersData.count /
            (Math.ceil(charactersData.results.length / 10) * 10)
        )
      );
    }
    if (query) {
      fetchData();
    } else {
      setCharacters([]);
    }
  }, [query, currentPage]);

  return (
    <div className={style.container}>
      <div className={style.containerInner}>
        <div className={style.content}>
          <PageTitle title="Search Results" />
          <ul>
            {isFetched ? (
              characters.length === 0 ? (
                <li className={style.emptyContainer}>
                  <div className={style.emptyImageContainer}>
                    <img
                      src={assets.deathStar}
                      alt="death star"
                      className={style.emptyImage}
                    />
                  </div>
                  <h3 className={style.emptyText}>No result</h3>
                </li>
              ) : (
                characters.map((character) => (
                  <CharacterListItem
                    character={character}
                    key={character.name}
                    search
                  />
                ))
              )
            ) : (
              Array.from({ length: lastPage || 10 }, (_, i) => i).map(
                (placeholder) => <LoadingListItem key={placeholder} />
              )
            )}
          </ul>
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          lastPage={lastPage}
        />
      </div>
    </div>
  );
};

export default Search;
