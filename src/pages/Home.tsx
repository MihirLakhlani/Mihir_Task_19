import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

const Home = () => {
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://newsapi.org/v2/everything?q=tesla&from=2023-04-19&sortBy=publishedAt&apiKey=cfa61605649043ee8bc442a5b007fbf3'
      );
      const data = response.data.articles;
      setNewsData(data);
      setIsLoading(false); // Set isLoading to false after data is fetched
    } catch (error) {
      console.error('Error fetching news data:', error);
      setIsLoading(false); // Set isLoading to false on error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (pageNumber:any) => {
    setCurrentPage(pageNumber);
  };

  const handleRowClick = (item:any) => {
    setSelectedItem(item);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);

  const renderTableRows = () => {
    return currentItems.map((item:any, index) => (
      <tr key={index} onClick={() => handleRowClick(item)}>
        <td>{item.title}</td>
        <td>{item.author}</td>
        <td>{item.publishedAt}</td>
        <td>
          <img src={item.urlToImage} alt="News" style={{ width: '50px' }} />
        </td>
        <td>
          <button className="btn btn-primary" onClick={() => handleRowClick(item)}>
            View Details
          </button>
        </td>
      </tr>
    ));
  };
  

  const renderPopup = () => {
    if (selectedItem) {
      return (
        <div className="modal fade show "  role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedItem.title}</h5>
                <button type="button" className="close btn btn-primary" onClick={handleClosePopup}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{selectedItem.description}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClosePopup}>Close</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  

  const renderPagination = () => {
    const pageNumbers = Math.ceil(newsData.length / itemsPerPage);
    const paginationItems = [];

    for (let i = 1; i <= pageNumbers; i++) {
      paginationItems.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          <button className="page-link">{i}</button>
        </li>
      );
    }

    return (
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {paginationItems}
          <li
            className={`page-item ${
              currentPage === pageNumbers ? 'disabled' : ''
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published At</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? ( // Check if isLoading is true
                <tr>
                  <td colSpan={4} className="text-center">
                    Loading..
                    <Spinner animation="border" variant="primary" />
                  </td>
                </tr>
              ) : (
                renderTableRows() // Render the table rows if isLoading is false
              )}
            </tbody>
          </table>
          {renderPagination()}
          {renderPopup()}
        </div>
      );
    };
    
    export default Home;
