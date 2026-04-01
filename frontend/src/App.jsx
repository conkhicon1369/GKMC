import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import CategoryPage from './pages/CategoryPage';
import CreateArticlePage from './pages/CreateArticlePage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:slug" element={<ArticleDetailPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/create" element={<CreateArticlePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
