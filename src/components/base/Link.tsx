import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

interface LinkProps {
    href: string;
    target?: string;
    text: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        link: {
            width: 'fit-content',
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline'
            }
        }
    })
);

const Link = ({
    href,
    text,
    target
}: LinkProps) => {
    const styles = useStyles()

    return (
        <a
            className={ styles.link }
            href={ href }
            target={ target }
        >
            { text }
        </a>
    )
}

export default Link
