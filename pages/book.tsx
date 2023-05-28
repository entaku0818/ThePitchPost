import React, {useEffect, useState} from 'react';
import {useBook} from "../hooks/useBooks";
import {FaHeart} from "react-icons/fa";
import styled from 'styled-components';
import {useRouter} from "next/router";
import {addComment, Comment, getComments} from "../firebase/comments";
import {checkLogin} from "../firebase/auth";
import {LoginModal} from "../components/LoginModal";
import { useAuth } from '../hooks/useAuth';
import Head from "next/head";
import Header from "../components/header";

const Book = () => {

    const router = useRouter();
    if (!router.query.id) {
        return <div>Loading...</div>;
    }

    const { id } = router.query;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isModalOpen, setIsModalOpen] = useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isLoading, book } = useBook(id)
    if (isLoading) {
        return <div>Loading...</div>;
    }


    if (!book) {
        return <div>Book not found</div>;
    }

    function noLogin() {
        setIsModalOpen(true);
    }
    function handleModalClose() {
        setIsModalOpen(false);
        console.log(isModalOpen)
    }

    return (
        <>
            <Head>
                <title>the-pitch-post</title>
                <meta name="description" content="the-pitch-post" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
        <Card>
            <Image src={book?.imageUrl ?? "https://ichef.bbci.co.uk/onesport/cps/976/cpsprodpb/1571B/production/_125753878_football.jpg"} alt={book?.id} />
            <Content>
                <Title>{book?.title}</Title>
                <Button href={book?.url}>続きを読む</Button>
            </Content>
            <div>
                <CommentList bookId={book?.id} />
                <CommentForm bookId={book?.id} noLogin={noLogin} />
            </div>
            <LoginModal isOpen={isModalOpen} onClose={handleModalClose} />

        </Card>
        </>

    );
};


interface CommentListProps {
    bookId: string;
}
const CommentSectionContainer = styled.div`
  width: 100%;
`;

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
        <CommentSectionContainer className="comment-section">
            <h2>Comments</h2>
            {comments.map((comment) => (
                <div key={comment.id} className="comment">
                    <div className="comment-header">
                        <img
                            src={`https://api.adorable.io/avatars/48/${comment.userId}.png`}
                            alt="avatar"
                            className="comment-avatar"
                        />
                        <div className="comment-header-right">
                            <span className="comment-author-name">{comment.displayName}</span>
                            {/*<small className="comment-date">{comment.createdAt.toDateString()}</small>*/}
                        </div>
                    </div>
                    <p className="comment-text">{comment.comment}</p>
                </div>
            ))}
        </CommentSectionContainer>
    );
}

interface CommentFormProps {
    bookId: string;
    noLogin: () => void;
}

function CommentForm({ bookId, noLogin }: CommentFormProps) {
    const [comment, setComment] = useState('');

    const { getCurrentUser } = useAuth();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(bookId);


        checkLogin()
            .then(async () => {
                // ログインしている場合の処理
                const currentUser = await getCurrentUser();
                await addComment(bookId, currentUser.uid, currentUser.displayName || "", comment);
                setComment("");
            })
            .catch(() => {
                // ログインしていない場合の処理
                noLogin();
            });

    }

    return (
        <CommentFormContainer className="comment-form" onSubmit={handleSubmit}>
            <h3>Pitch Posts</h3>
            <CommentTextarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                placeholder="Type your comment here"
                className="comment-input"
            ></CommentTextarea>
            <CommentButtonContainer>
                <CommentButton type="submit" className="comment-btn">
                    Pitch Post
                </CommentButton>
            </CommentButtonContainer>
        </CommentFormContainer>
    );
}


const CommentTextarea = styled.textarea`
  /* CSSスタイルを記述 */
`;

const CommentButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  /* その他のスタイル */
`;

const CommentFormContainer = styled.form`
  margin-top: 20px;
  /* その他のスタイル */
`;

const CommentButton = styled.button`
  background-color: #009900;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  /* その他のスタイル */
`;



const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center; /* 追加: 画像を縦方向に中央に寄せる */
`;

const Image = styled.img`
  object-fit: cover;
  width: 50em;
  height: 200px;
  margin: 0 auto; /* 追加: 画像を水平方向に中央に寄せる */
`;

const Content = styled.div`
  padding: 10px;
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

const Button = styled.a`
  background-color: #009900;
  color: #fff;
  margin-top: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  text-decoration: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Book;