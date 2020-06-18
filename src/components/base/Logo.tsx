import { createStyles, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const logo = require('images/logo.jpg');

interface LogoProps {
    className?: string;
    containerClass?: string;
}

const useStyles = makeStyles(() =>
    createStyles({
        logoContainer: {
            display: 'flex'
        },
        logo: {
            height: '100px'
        }
    })
);

const Logo: React.FunctionComponent<LogoProps> = ({
    className,
    containerClass
}) => {
    const styles = useStyles();

    const classes = clsx(className, styles.logo);
    const containerClasses = clsx(containerClass, styles.logoContainer);

    return (
        <div className={ containerClasses }>
            <img src={ logo } className={ classes } alt="logo" />
        </div>
    );
};

export default Logo;
