import Layout from '../components/Layout'
    
const Recommend = () => {
    return (
        <Layout title="Recommend | PHM Data Hub">
            <div className="page__recommend">
                <h1>About PHM Data Hub</h1>
                <div className="body">
                    <p>Recomment a dataset!</p>
                    <input type="text" placeholder="Title"/>
                    <input type="text" placeholder="URL"/>
                    <input type="text" placeholder="Comments"/>
                </div>
            </div>
        </Layout>
    );
}
    
export default Recommend;
