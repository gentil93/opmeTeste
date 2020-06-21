import { createStyles, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

interface LinkProps {
    href: string;
    target?: string;
    text: string;
    className?: string
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
    target,
    className = ''
}: LinkProps) => {
    const styles = useStyles()

    const aStyle = clsx(styles.link, {
        [className]: !!className
    })

    return (
        <a
            className={ aStyle }
            href={ href }
            title={ text }
            target={ target }
        >
            { text }
        </a>
    )
}

export default Link
