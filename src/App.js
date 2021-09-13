import React, {useState, useEffect} from 'react';
import './App.css';

const App = () => {
  const [articles, setArticles] = useState([])
  const [selectedArticle, setSelectedArticle] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
          const response = await fetch(
            `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${process.env.REACT_APP_MOST_POPULAR_API_KEY}`
          )
          const articles = await response.json();
          setArticles(articles.results)
      } catch (error) {
        console.error(error)
      }
    }
    fetchArticles()
  },[])

  return (
    <>
      <section>
        <h1>New York Times Most Popular Articles</h1>
        {articles.map((article) => {
          const {title, id, abstract, byline} = article;

          return (
            <article key={id} onClick={() => setSelectedArticle(article)}>
              <div>
                <h2>{title}</h2>
                <p>{byline}</p>
              </div>
              <div>
                <h3>Article Detail</h3>
                {selectedArticle ? <ArticleDetails key={selectedArticle.id} article={selectedArticle} /> : <div />}
              </div>
            </article>
          )
        })}
      </section>
    </>
  );
}

const ArticleDetails = ({ article }) => {
  const [articleDetails, setArticleDetails] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const resp = await fetch(
        `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${process.env.REACT_APP_MOST_POPULAR_API_KEY}`
      )
      const article = await resp.json();
      console.log(article)
      setArticleDetails(article)
    }

    fetchArticle();
  }, []);

  console.log('details', article)
  if (!article) {
    return <div>Loading</div>
  }

  return (
    <div key={article.id}>
      {articleDetails && (
        <>
          <div>
            <h4>{article.title}</h4>
            <p>{article.abstract}</p>
            <p>{article.byline}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default App;
