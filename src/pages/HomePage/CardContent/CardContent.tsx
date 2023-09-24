import { FC } from 'react';
import './CardContent.css';
import ImageCarousel from 'components/ImageCarousel/ImageCarousel';
import { ProductI } from 'types/product';

interface CardContentProps {
  selectedProduct: ProductI;
}

const CardContent: FC<CardContentProps> = ({ selectedProduct }) => {
  return (
    <main className="card-content-container">
      <section className="content__inner left">
        <ImageCarousel images={selectedProduct.images} />
      </section>
      <section className="content__inner right">
        <p className="title">{selectedProduct.title}</p>
        <p className="description">{selectedProduct.description}</p>
        <p className="stock">Available Stock : {selectedProduct.stock}</p>
        <p>
          Price <span className="price">${selectedProduct.price}.00</span>
        </p>
        <p>
          Brand <span className="brand">{selectedProduct.brand}</span>
        </p>
      </section>
    </main>
  );
};

export default CardContent;
