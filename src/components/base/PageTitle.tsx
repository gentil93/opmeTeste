import { Typography, useMediaQuery } from '@material-ui/core';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { FC } from 'react';

interface PageTitleProps {
    title: string;
    isModal?: boolean;
    onClose?: () => void;
}

const useStyles = makeStyles(({
    palette,
    spacing
}) =>
    createStyles({
        pageTitleDivContainer: {
            display: 'flex',
            alignItems: 'center'
        },
        pageTitleWrapper: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            margin: 0,
            padding: spacing(6, 0),
            '&::after': {
                display: 'block',
                content: "''",
                height: '5px',
                flexGrow: 1,
                flexShrink: 1,
                backgroundColor: palette.primary.main,
                marginLeft: spacing(6)
            }
        },
        pageTitleWrapperMobile: {
            margin: `0 -${spacing(5)}px`,
            padding: spacing(7, 8, 6),
            textAlign: 'center',
            position: 'sticky',
            top: 0,
            background: '#EDF0F2',
            zIndex: 1
        },
        pageTitle: {
            color: '#282828',
            '&::first-letter': {
                textTransform: 'uppercase'
            }
        },
        mobileIcon: {
            position: 'absolute',
            zIndex: 2,
            top: spacing(5),
            right: spacing(5)
        }
    })
);

const PageTitle = ({ title, isModal = false, onClose }: PageTitleProps) => {
    const styles = useStyles();
    const { breakpoints } = useTheme();

    const isDesktop = useMediaQuery(breakpoints.up('sm'));

    const pageTitleClasses = clsx({
        [styles.pageTitleWrapper]: isDesktop,
        [styles.pageTitleWrapperMobile]: !isDesktop
    });

    const variant = isDesktop ? 'h1' : 'h2';
    const component = isModal ? 'h2' : 'h1';

    const WrapperComponent: FC = ({ children }) => (
        isDesktop ? <div className={ styles.pageTitleDivContainer }>{ children }</div> : <>{ children }</>
    );

    return (
        <WrapperComponent>
            <div className={ pageTitleClasses }>
                <Typography
                    variant={ variant }
                    component={ component }
                    className={ styles.pageTitle }
                >
                    { title }
                </Typography>
            </div>
        </WrapperComponent>
    );
};

export default PageTitle;
