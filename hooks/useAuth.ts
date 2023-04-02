import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../firebase/firebase';
import {onAuthStateChanged} from "@firebase/auth";

type User = {
    uid: string;
    displayName: string | null;
    photoURL: string | null;
};

type AuthContextType = {
    user: User | null;
    updateProfile: (displayName: string, photoURL: string) => Promise<void>;
};

const AuthContext = React.createContext<AuthContextType>({ user: null, updateProfile: async () => {} });

export const useAuth = () => {
    const [authUser, setAuthUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { uid, displayName, photoURL } = user;
                setAuthUser({ uid, displayName, photoURL });
            } else {
                setAuthUser(null);
            }
        });

        return unsubscribe;
    }, []);

    const getCurrentUser = () => {
        return new Promise<User>((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    const { uid, displayName, photoURL } = user;
                    resolve({ uid, displayName, photoURL });
                } else {
                    reject("User is not logged in.");
                }
            });

            return () => unsubscribe();
        });
    };

    const updateProfile = async (displayName: string, photoURL: string) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('ユーザーが存在しません');
            }


            setAuthUser({
                uid: authUser?.uid || '',
                displayName: displayName,
                photoURL: photoURL,
            });
        } catch (error) {
            console.log('プロフィールの更新に失敗しました', error);
            throw error;
        }
    };

    return { user: authUser, getCurrentUser,updateProfile };
};

export default AuthContext;