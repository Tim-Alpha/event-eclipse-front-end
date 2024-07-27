import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from './SearchBar';
import Card from './Card';
import './Venues.css';
import { fetchResults, fetchDefaultResults, setNoMoreResults } from '../slices/searchSlice';
import Header from './Header';
import Footer from './Footer';
import Spinner from './Spinner';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const Venues = () => {
  const results = useSelector((state) => state.search.results);
  const page = useSelector((state) => state.search.page);
  const totalPages = useSelector((state) => state.search.totalPages);
  const query = useSelector((state) => state.search.query);
  const isLoading = useSelector((state) => state.search.isLoading);
  const isLoadingMore = useSelector((state) => state.search.isLoadingMore);
  const noMoreResults = useSelector((state) => state.search.noMoreResults);
  const dispatch = useDispatch();

  useEffect(() => {
    if (results.length === 0) {
      dispatch(fetchDefaultResults());
    }
  }, [dispatch, results.length]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
      if (bottom && !isLoadingMore && !noMoreResults) {
        const nextPage = page + 1;
        console.log(`
            NEXTPAGE: ${nextPage}
            TOATA PAGE: ${totalPages}
            `)
        if (nextPage <= totalPages) {
          dispatch(fetchResults({ query, page: nextPage }));
        } else {
          dispatch(setNoMoreResults(true));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, isLoadingMore, page, query, noMoreResults, totalPages]);

  return (
    <>
      <section id="explore-venues" className="search-venues">
        <Header />
        <SearchBar />
        <div className='venues-container'>
          {isLoading ? (
            <div className="spinner-container">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="venues-grid">
                {results.map((venue, index) => (
                  <Card
                    key={index}
                    image={venue.imageUrl}
                    title={truncateText(venue.venueName, 30)}
                    description={venue.description}
                    footer={`Location: ${venue.location}`}
                    width="300px"
                    height="350px"
                    scaleOnHover={true}
                  />
                ))}
              </div>
              {isLoadingMore && (
                <div className="spinner-container">
                  <Spinner />
                </div>
              )}
              {noMoreResults && (
                <div className="no-more-results">
                  No more results
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Venues;
