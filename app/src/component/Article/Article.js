import React, {Component} from "react";
import * as PropTypes from "prop-types";

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            dataKeys: {
                getArticle: null
            }
        }
    }

    async componentDidMount() {
        const {drizzle, drizzleState} = this.props;
        const state = drizzleState.contracts.NewsPayPer;

        const contract = drizzle.contracts.NewsPayPer;

        if (state.initialized) {
            const getArticleKey = await contract.methods["getArticle"].cacheCall(this.state.id);
            this.setState({
                "dataKeys": {
                    "getArticle": getArticleKey
                }
            });
        }
    }

    render() {
        const {drizzleState} = this.props;
        const state = drizzleState.contracts.NewsPayPer;
        const article = state.getArticle[this.state.dataKeys.getArticle];

        if(article === undefined) {
            return (
                <h3>
                    Loading article..
                </h3>
            )
        }

        return (
            <div>
                <h3>Article id is {this.state.id}</h3>
                <h3>Article cost is {article.value[1]}</h3>
            </div>
        )
    }

}

Article.propTypes = {
    id: PropTypes.number.isRequired
};

export default Article;