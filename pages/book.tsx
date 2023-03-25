import React, {useEffect, useState} from 'react';
import {useBook} from "../hooks/useBooks";
import {FaHeart} from "react-icons/fa";
import styled from 'styled-components';
import {useRouter} from "next/router";
import {addComment, Comment, getComments} from "../firebase/comments";


const Book = () => {
    const router =  useRouter();
    const { id } = router.query;
    const { isLoading, book } = useBook("0ZwKGexFWsliPxOiYNm5")

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!book) {
        return <div>Book not found</div>;
    }

    return (

        <Card>
            <Image src={book?.imageUrl} alt={book?.id} />
            <Content>
                <Title>{book?.title}</Title>
                <Description>{book?.description}</Description>
                <Icon><FaHeart /></Icon>
            </Content>
            <div>
                <CommentList bookId={book?.id} />
                <CommentForm bookId={book?.id} />
            </div>
        </Card>
    );
};


interface CommentListProps {
    bookId: string;
}

function CommentList({ bookId }: CommentListProps) {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        async function fetchComments() {
            const comments = await getComments(bookId);
            setComments(comments);
        }
        fetchComments();
    }, [bookId]);

    return (
        <div>
            <h2>Comments</h2>
            {comments.map((comment) => (
                <div key={comment.id} className="comment">
                    <div className="comment-header">
                        <div className="comment-author">
                            <img
                                src={`https://api.adorable.io/avatars/48/${comment.userId}.png`}
                                alt="avatar"
                                className="comment-avatar"
                            />
                            <span className="comment-author-name">{comment.userId}</span>
                        </div>
                    </div>
                    <p>{comment.comment}</p>
                </div>
            ))}
        </div>
    );
}

interface CommentFormProps {
    bookId: string;
}

function CommentForm({ bookId }: CommentFormProps) {
    const [comment, setComment] = useState('');


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(bookId);
        await addComment(bookId, 'userId', comment);
        setComment('');
    }

    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <h3>Add a comment</h3>
            <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                placeholder="Type your comment here"
                className="comment-input"
            ></textarea>
            <button type="submit" className="comment-btn">
                Post Comment
            </button>
        </form>
    );
}


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


export default Book;