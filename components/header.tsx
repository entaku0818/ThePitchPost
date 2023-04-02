import Link from 'next/link';
import { FaUser } from 'react-icons/fa';

function Header() {
    return (
        <div className="header">
            <nav>
                <ul>
                    <li>
                        <Link href="/profile">
                                <FaUser />
                        </Link>
                    </li>
                </ul>
            </nav>

            <style jsx>{`
        .header {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 10px;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        li {
          display: inline-block;
          margin-right: 10px;
        }
      `}</style>
        </div>
    );
}

export default Header;
