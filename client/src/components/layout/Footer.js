import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark mt-5 p-3 text-center text-white">
             copyright &copy; {new Date().getFullYear()} MahmoudHany
        </footer>
    );
};

export default Footer;