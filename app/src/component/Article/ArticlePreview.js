import React, {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {drizzleReactHooks} from "@drizzle/react-plugin";

const useStyles = makeStyles({
    media: {
        height: 140,
    },
    card: {
        "margin-bottom": 15,
    },
});


const ArticlePreview = (props) => {
    let {id} = props;
    const classes = useStyles();

    const {useCacheCall} = drizzleReactHooks.useDrizzle()

    const article = useCacheCall('NewsPayPer', 'getArticle', [id]);

    if (undefined === article) {
        return (
            <div>Loading article {id}</div>
        )
    }

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    title="Article title"
                    image={"https://www.blockassets.io/wp-content/uploads/2017/03/Background-1356x430.jpg"}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Article title
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        In tristique bibendum quam vitae hendrerit. Pellentesque lacus est, placerat aliquet interdum
                        sed...
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link to={"articles/" + id}>
                    <Button size="small" color="primary">
                        Read article
                    </Button>
                </Link>
            </CardActions>
        </Card>
    )
}

ArticlePreview.propTypes = {
    id: PropTypes.number.isRequired
};

export default ArticlePreview;