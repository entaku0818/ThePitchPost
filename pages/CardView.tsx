import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import Router from 'next/router';
import {Book} from '../firebase/books'

const CardView = ({ id, title, description, imageUrl }:Book) => {

    const handleClick = () => {

        Router.push({
            pathname: '/book',
            query: { id: id }
        });
    };
    return (
        <Card onClick={handleClick}>
            <Image src={imageUrl} alt={title} />
            <Content>
                <Title>{title}</Title>
                <Description>{description}</Description>
                <Icon><FaHeart /></Icon>
            </Content>
        </Card>
    );
};

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  border-radius: 5px 5px 0 0;
  object-fit: cover;
  height: 200px;
`;

const Content = styled.div`
  padding: 10px;
  flex: 1;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

const Description = styled.p`
  font-size: 1rem;
  margin: 10px 0;
`;

const Icon = styled.div`
  margin-top: auto;
  color: red;
`;

export default CardView;