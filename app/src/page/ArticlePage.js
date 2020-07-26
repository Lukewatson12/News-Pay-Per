import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


const ArticlePage = (drizzle) => {
    const {articleId} = useParams();
    const [articleKey, setArticleKey] = useState(undefined)

    const contracts = drizzle.drizzle.contracts;
    const newsPayPerContract = contracts.NewsPayPer;

    const store = drizzle.drizzleState.contracts;
    const article = store.NewsPayPer.getArticle[articleKey];

    useEffect(() => {
        let articleKey = newsPayPerContract.methods["getArticle"].cacheCall(articleId);
        setArticleKey(articleKey);
    }, [])


    if (undefined === articleKey || article === undefined) {
        return (
            <div>Loading Article {articleId}</div>
        )
    }

    return (
        <div>
            <p>Article cost is {article.value[1]}</p>
        </div>
    )
}

export default ArticlePage;