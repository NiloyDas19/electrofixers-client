import Banner from "./Banner/Banner";
import DocumentTitle from './../../documentTitle/DocumentTitle';

const Home = () => {
    DocumentTitle('Home');
    
    return (
        <div>
            <Banner></Banner>
            
        </div>
    );
};

export default Home;