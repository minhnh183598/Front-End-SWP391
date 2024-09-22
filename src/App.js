import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes/routes';
import { DefaultLayout } from './components/Layout';
import { Fragment} from 'react';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ScrollToTopBtn from './components/ScrollToTopBtn/ScrollToTopBtn';

function App() {
    return (
        <Router>
            <ScrollToTop/>
            <div>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        // nếu không có layout sẽ lấy default
                        const Layout = route.layout === null ? Fragment : DefaultLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    // Layout = default layout -> page là children (content)
                                    <Layout>
                                        <Page />
                                        <ScrollToTopBtn/>
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
