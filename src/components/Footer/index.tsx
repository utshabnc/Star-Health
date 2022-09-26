import { Link } from 'react-router-dom';
import styles from './index.module.css';

const footLinks = [
  { text: 'About Us', url: '/About' },
  { text: 'Privacy Policy', url: '/Privacy' },
  { text: 'FAQs', url: '/Faqs' },
];

const year = new Date().getFullYear();

function Footer() {
  return (
    <div className='bg-nav p-1'>
      <div className='flex items-left'>
        <div className={``}>
          <Link to={'/'}>
            <img src={'/images/Logo.png'} className=' h-8' />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
