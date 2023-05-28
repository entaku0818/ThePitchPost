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
import Picker from 'emoji-picker-react';


const Book = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();
    const { id } = router.query;

    const { isLoading, book } = useBook(id)

    useEffect(() => {
        async function fetchComments() {
            if (typeof id === "string") {
                const comments = await getComments(id);
                setComments(comments);
            }
        }
        if(id) fetchComments();
    }, [id]);

    if (!id || isLoading) {
        return <div>Loading...</div>;
    }

    if (!book) {
        console.log(id);
        return <div>Book not found</div>;
    }

    function noLogin() {
        setIsModalOpen(true);
    }
    function handleModalClose() {
        setIsModalOpen(false);
    }

    function handleCommentSubmitted() {
        async function fetchComments() {
            if (typeof id === "string") {
                const comments = await getComments(id);
                setComments(comments);
            }
        }
        if(id) fetchComments();
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
                <CommentSectionContainer>
                    <CommentList comments={comments} />
                    <CommentForm bookId={book?.id} noLogin={noLogin} onSubmitComment={handleCommentSubmitted} />
                </CommentSectionContainer>
                <LoginModal isOpen={isModalOpen} onClose={handleModalClose} />
            </Card>
        </>
    );
};
const CommentSectionContainer = styled.div`
  width: 100%;
  padding-left: 1em;
  padding-right: 1em;

`;

interface CommentListProps {
    comments: Comment[];
}

const CommentListContainer = styled.div`
  
`;
const CommentHeader = styled.div`
  display: flex;
`;

const CommentMain = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  margin-left: 1em;
`;

const ProfileName = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1em;
  font-size: medium;
`;

const CommentText = styled.div`
  margin-left: 3em;
`;
function CommentList({ comments }: CommentListProps) {



    return (
        <CommentListContainer className="comment-section">
            <h2>Comments</h2>
            {comments.map((comment) => (
                <CommentMain key={comment.id}>
                    <CommentHeader>
                        <ProfileImage src="user.svg" alt=""  />
                        <ProfileName >
                            {comment.displayName}
                            {/*<small className="comment-date">{comment.createdAt.toDateString()}</small>*/}
                        </ProfileName>
                    </CommentHeader>
                    <CommentText >{comment.comment}</CommentText>
                </CommentMain>
            ))}
        </CommentListContainer>
    );
}

interface CommentFormProps {
    bookId: string;
    noLogin: () => void;
    onSubmitComment: () => void;
}

function CommentForm({ bookId, noLogin, onSubmitComment }: CommentFormProps) {
    const [comment, setComment] = useState('');
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const { getCurrentUser } = useAuth();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();


        checkLogin()
            .then(async () => {
                // ログインしている場合の処理
                const currentUser = await getCurrentUser();
                await addComment(bookId, currentUser.uid, currentUser.displayName || "", comment);
                setComment("");
                onSubmitComment();
            })
            .catch(() => {
                // ログインしていない場合の処理
                noLogin();
            });

    }
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        setComment(comment + event.emoji);
    };

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
            {showEmojiPicker ? <Picker onEmojiClick={onEmojiClick} /> : null}
            <CommentButtonContainer>
                <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    Toggle Emoji Picker
                </button>
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
  width: 100%;
  height: 200px;
  margin: 0 auto; /* 追加: 画像を水平方向に中央に寄せる */
`;

const ProfileImage = styled.img`
  object-fit: fill;
  width: 2em;
  height: 2em;
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