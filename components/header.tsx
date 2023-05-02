import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import React from 'react';

const Header = () => {
    return (
        <header>
            <div className="header">
                <div className="title">The Pitch Post</div>
                <nav>
                    <ul>
                        <li>
                            <Link href="/profile">
                                <FaUser />
                            </Link>
                        </li>
                    </ul>
                </nav>

            </div>

            <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: start;
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

        .title {
          text-align: left;
          font-family: 'HeadLineA';
            font-style: normal;
            font-weight: 400;
            font-size: 48px;
            /* or 67px */
            
            
            color: #15B3A1;
        }
      `}</style>
        </header>
    );
};

export default Header;
