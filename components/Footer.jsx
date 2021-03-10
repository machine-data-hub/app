import Link from 'next/link'
import { useRouter } from 'next/router'
    
const Footer = () => {
    const router = useRouter()
    
    return (
        <div className="main__footer">
            <div className="footer__left">
                <a href="https://www.netlify.com">
                    <img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg" alt="Deploys by Netlify" />
                </a>
            </div>
            <div className="footer_right">
                <ul>
                    <Link href="/"><li className={router.pathname === '/' ? 'nav-active' : ''}>Home</li></Link>
                    <Link href="/about"><li className={router.pathname === '/about' ? 'nav-active' : ''}>About</li></Link>
                    <Link href="/suggest-dataset"><li className={router.pathname === '/suggest-dataset' ? 'nav-active' : ''}>Suggest a Dataset</li></Link>
                </ul>
            </div>
        </div>
    );
}
    
export default Footer
