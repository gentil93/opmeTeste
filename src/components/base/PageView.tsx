import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import PageTitle from 'components/base/PageTitle';
import React, { FunctionComponent } from 'react';

interface PageViewProps {
    title: string;
    pageClassName?: string;
}

const useStyles = makeStyles(({ spacing }: Theme) =>
    createStyles({
        pageContainer: {
            padding: spacing(0, 6),
            width: '100%',
            height: 'auto',
            minHeight: '100%',
            backgroundColor: '#EDF0F2'
        }
    })
);

const PageView: FunctionComponent<PageViewProps> = ({
    children,
    title,
    pageClassName
}) => {
    const styles = useStyles();

    const pageClasses = clsx(styles.pageContainer, pageClassName);

    return (
        <div className={ pageClasses }>
            <PageTitle title={ title } />
            { children }
        </div>
    );
};

export default PageView;