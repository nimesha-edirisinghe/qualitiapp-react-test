import { FC } from 'react';
import './Card.css';
import { ProductI } from 'types/product';

interface CardProps {
  productObj: ProductI;
  onClickHandler: (id: number) => void;
}

const Card: FC<CardProps> = ({ productObj, onClickHandler }) => {
  return (
    <main
      className="card-container"
      onClick={() => onClickHandler(productObj.id)}
    >
      <section className="card-image">
        <img
          src={productObj.thumbnail}
          alt="phone"
          width="305px"
          height="220px"
          className="card-image__container"
        />
      </section>
      <section className="card-title">
        <p className="card-title__text">{productObj.title}</p>
        <p className="card-title__text discount">${productObj.price}.00</p>
      </section>
      <section className="card-description">
        <p className="card-description__text">{productObj.description}</p>
      </section>
      <section className="card-price"></section>
    </main>
  );
};

export default Card;
