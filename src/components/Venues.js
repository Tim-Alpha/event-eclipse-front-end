import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from './SearchBar';
import Card from './Card';
import './Venues.css';
import { fetchResults } from '../slices/searchSlice';

const Venues = () => {
  const results = useSelector((state) => state.search.results);
  const page = useSelector((state) => state.search.page);
  const query = useSelector((state) => state.search.query);
  const dispatch = useDispatch();

  const handleLoadMore = () => {
    const nextPage = page + 1;
    dispatch(fetchResults({ query, page: nextPage }));
  };

  return (
    <section id="explore-venues" className="search-venues">
      <SearchBar />
      <div className='venues-container'>
        <div className="venues-grid">
          {results.map((venue, index) => (
            <Card
              key={index}
              image={venue.imageUrl}
              title={venue.venueName}
              description={venue.description}
              footer={`Location: ${venue.location}`}
              width="300px"
              height="350px"
              scaleOnHover={true}
            />
          ))}
        </div>
        {results.length > 0 && (
          <button onClick={handleLoadMore} className="load-more">
            Load More
          </button>
        )}
      </div>
    </section>
  );
}

export default Venues;
