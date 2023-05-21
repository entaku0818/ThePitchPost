import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import Router from 'next/router';
import {Book} from '../firebase/books'

const CardView = ({ id, title, description, imageUrl, sourceSite }:Book) => {

    const handleClick = () => {

        Router.push({
            pathname: '/book',
            query: { id: id }
        });
    };
    return (
        <Card onClick={handleClick}>
            {imageUrl === undefined ? (
                <Image src="no-image.png" alt="" />
            ) : (

                <Image src={imageUrl} alt={title} />
            )}
            <Content>
                <Title>{title}</Title>
                <Description>{description}</Description>
                <Source>{sourceSite}</Source>
                {/*<CreatedAt>{book.createdAt}</CreatedAt>*/}
                {/*<Icon><FaHeart /></Icon>*/}
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
  background-color: white; /* Add this line to set the background color */
  @media (max-width: 767px) {
    max-width: 320px;
  }
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
  font-size: 1rem;
  margin: 0;
`;

const Description = styled.p`
  font-size: 0.8rem;
  margin: 10px 0;
`;

const Source = styled.p`
  font-size: 0.5rem;
  margin: 10px 0;
  color: #7c7c7c;
  
`;

const Icon = styled.div`
  margin-top: auto;
  color: red;
`;

export default CardView;