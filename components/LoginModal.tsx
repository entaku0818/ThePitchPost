import React, {useEffect} from "react";
import Login from '../components/Login';

export function LoginModal({ isOpen, onClose }) {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; // body要素にoverflow: hiddenを設定する
        } else {
            document.body.style.overflow = "visible"; // body要素のoverflowを初期値に戻す
        }

        return () => {
            document.body.style.overflow = "visible"; // コンポーネントがアンマウントされた際にoverflowを初期値に戻す
        };
    }, [isOpen]);

    return (
        <div className={isOpen ? "modal modal-open" : "modal modal-close"}>
            <div className="modal-content">
                <p>ログインしてください。</p>
                <Login />
                <button onClick={onClose}>閉じる</button>
            </div>
        </div>
    );
}

