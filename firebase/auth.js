import { auth } from "./firebase";

export function checkLogin() {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    });
}