import Link from 'next/link'
    
const Navbar = () => {
    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar__left">
                    <Link href="/"><h1>PHM Data Hub</h1></Link>
                </div>
                <div className="navbar__right">
                    <ul>
                        <Link href="/"><li>Home</li></Link>
                        <Link href="/about"><li>About</li></Link>
                        <Link href="/recommend"><li>Suggest a Data</li></Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}
    
export default Navbar
