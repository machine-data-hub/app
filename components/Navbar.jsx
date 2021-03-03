import Link from 'next/link'
import { useRouter } from 'next/router'
    
const Navbar = () => {
    const router = useRouter()
    
    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar__left">
                    <Link href="/"><h1>PHM Data Hub</h1></Link>
                </div>
                <div className="navbar__right">
                    <ul>
                        {/* if the condition returns true -> give a nav-active class to li element */}
                        <Link href="/"><li className={router.pathname === '/' ? 'nav-active' : ''}>Home</li></Link>
                        <Link href="/about"><li className={router.pathname === '/about' ? 'nav-active' : ''}>About</li></Link>
                        <Link href="/suggest-dataset"><li className={router.pathname === '/suggest-dataset' ? 'nav-active' : ''}>Suggest a Dataset</li></Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}
    
export default Navbar
