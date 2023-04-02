import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

function Profile() {
    const router = useRouter();
    const { user, updateProfile } = useAuth();
    const [name, setName] = useState(user?.displayName || '');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await updateProfile(name, '');
        } catch (error) {
            console.log('プロフィールの更新に失敗しました', error);
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    return (
        <div>
            <h1>プロフィール編集</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">名前</label>
                    <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />
                </div>
                <button type="submit">更新</button>
            </form>
        </div>
    );
}

export default Profile;