import { FC, useEffect, useState } from 'react';
import './HomePage.css';
import { productData } from 'mocks/response';
import Card from '../../components/Card/Card';
import SearchSection from './SearchSection/SearchSection';
import useDebounce from 'hooks/useDebounce';
import Modal from 'components/Modal/Modal';
import CardContent from './CardContent/CardContent';
import { NO_OF_RECORDS_PER_PAGE } from 'utils/constants';
import { ProductI } from 'types/product';

const HomePage: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredProductData, setFilteredProductData] = useState(
    productData.products
  );
  const [selectedProduct, setSelectedProduct] = useState({} as ProductI);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const debouncedValue = useDebounce(inputValue, 1000);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Event handler for input value change
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Event handler to close the modal
  const onCloseModalHandler = () => {
    setModalVisible(false);
  };

  // Event handler to open the modal
  const onOpenModalHandler = () => {
    setModalVisible(true);
  };

  // Event handler for card click
  const onCardClickHandler = (id: number) => {
    const _filterProduct = productData.products.find(
      (product) => product.id === id
    );
    if (_filterProduct) {
      setSelectedProduct(_filterProduct);
    }
  };

  // Function to load products with pagination
  const loadProducts = (pageNumber: number) => {
    setIsLoading(true);
    setTimeout(() => {
      const startIndex = (pageNumber - 1) * NO_OF_RECORDS_PER_PAGE;
      const endIndex = startIndex + NO_OF_RECORDS_PER_PAGE;
      const newProducts = productData.products.slice(startIndex, endIndex);

      if (pageNumber === 1) {
        setFilteredProductData(newProducts);
      } else {
        setFilteredProductData((prevProducts) => [
          ...prevProducts,
          ...newProducts,
        ]);
      }

      setPage(pageNumber + 1);
      setIsLoading(false);
    }, 1000);
  };

  // Initial load of products
  useEffect(() => {
    loadProducts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 4 &&
      !isLoading
    ) {
      loadProducts(page);
    }
  };

  // Add scroll event listener for infinite scrolling
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isLoading]);

  // Update filtered products based on debounced search input
  useEffect(() => {
    const filteredData = productData.products.filter((product) =>
      product.title.toLowerCase().includes(debouncedValue.toLowerCase())
    );
    setFilteredProductData(filteredData);
  }, [debouncedValue]);

  return (
    <>
      <Modal isOpen={modalVisible} onClose={onCloseModalHandler}>
        <CardContent selectedProduct={selectedProduct} />
      </Modal>
      <main className="home-container">
        <section className="search-section">
          <SearchSection onChangeHandler={onChangeHandler} value={inputValue} />
        </section>
        <section className="products-section" onClick={onOpenModalHandler}>
          {filteredProductData?.map((product, index) => (
            <div className="product-item" key={index}>
              <Card productObj={product} onClickHandler={onCardClickHandler} />
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default HomePage;
