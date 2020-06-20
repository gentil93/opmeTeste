import { createStyles, makeStyles } from '@material-ui/core/styles';
import MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import React, { ChangeEvent, ReactNode } from 'react';

export interface RowWithID {
    id: string | null;
    columns: ReactNode[];
}

interface TableProps {
    headers: ReactNode[];
    rows: RowWithID[];
    onRowClick?: (id: string) => void;
    hasPagination?: boolean;
    noItemsMessage?: string;
    isPaginationSticky?: boolean;
    isHeaderSticky?: boolean;
    onPageChange?: (page: number) => void;
    onRowsPerPageChange?: (rowsPerPage: number) => void;
    rowsPerPage?: number;
    headerCellClass?: string;
    rowsPerPageOptions?: number[];
    page?: number;
    tableContainerClassName?: string;
}

const useStyles = makeStyles(({
    spacing
}) =>
    createStyles({
        noItemsMessage: {
            textAlign: 'center'
        },
        pagination: {
            flexGrow: 1
        },
        sticky: {
            position: 'sticky',
            top: 0,
            zIndex: 1,
            backgroundColor: '#FFF'
        },
        stickyBottom: {
            bottom: 0
        },
        headerColumn: {
            fontWeight: 700,
            paddingLeft: spacing(4),
            paddingRight: spacing(4),
            textAlign: 'center',
            fontSize: '1rem',
            color: 'inherit',
            border: 'none'
        },
        tableRoot: {
            height: '100%'
        },
        clickableRow: {
            cursor: 'pointer'
        },
    })
);

const Table = ({
    headers,
    rows,
    noItemsMessage,
    hasPagination,
    onRowClick,
    onPageChange,
    onRowsPerPageChange,
    page,
    headerCellClass,
    rowsPerPageOptions,
    rowsPerPage,
    isHeaderSticky = true,
    isPaginationSticky = true,
    tableContainerClassName
}: TableProps) => {
    const styles = useStyles();

    const getTableHeaders = (): ReactNode => {
        const classes = clsx(headerCellClass, styles.headerColumn, {
            [styles.sticky]: isHeaderSticky
        });

        const tableHeaders = headers.map((header, idx) => (
            <TableCell
                key={ `headerCell ${idx}` }
                align='center'
                className={ classes }
            >
                { header }
            </TableCell>
        ))

        return (
            <TableHead>
                <TableRow>{ tableHeaders }</TableRow>
            </TableHead>
        )
    }

    const toRow = ({
        columns,
        id
    }: RowWithID) => {
        const onClick = onRowClick && id ? () => onRowClick(id) : undefined;

        const rowClassName = clsx({
            [styles.clickableRow]: onRowClick,
        });

        return (
            <TableRow
                hover
                tabIndex={ -1 }
                key={ `row ${id}` || '' }
                onClick={ onClick }
                className={rowClassName}
            >
                { columns.map((column, columnID) => {
                    return (
                        <TableCell key={ `column ${id}-${columnID}` || '' } align='center'>
                            { column }
                        </TableCell>
                    );
                }) }
            </TableRow>
        )
    }

    const getTableBody = (): ReactNode => {
        if (rows.length === 0) {
            if (noItemsMessage) {
                return (
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={ headers.length }>
                                <p className={ styles.noItemsMessage }>
                                    { noItemsMessage }
                                </p>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                );
            }

            return null;
        }

        const tableRows = rows.map(toRow)

        return (
            <TableBody >{ tableRows }</TableBody>
        );
    };

    const getTablePagination = () => {
        const paginationClass = clsx(styles.pagination, {
            [styles.sticky]: isPaginationSticky,
            [styles.stickyBottom]: isPaginationSticky
        });

        const handleChangePage = (_: any, newPage: number) => {
            onPageChange?.(newPage);
        };

        const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
            onRowsPerPageChange?.(+event.target.value);
        };

        const getPaginationLabel = ({
            from,
            to,
            count
        }: {
            from: number;
            to: number;
            count: number;
        }) => `Página ${Number(page) + 1}`;

        const hidePrevButton = Number(page) <= 0 || false

        return (
            <div className={ paginationClass }>
                <TablePagination
                    rowsPerPageOptions={ rowsPerPageOptions || [10, 25, 100] }
                    component="div"
                    count={ -1 }
                    backIconButtonProps={ {
                        disabled: hidePrevButton
                    } }
                    labelRowsPerPage='Tuplas por página'
                    labelDisplayedRows={ getPaginationLabel }
                    rowsPerPage={ rowsPerPage || 10 }
                    page={ page ?? 0 }
                    onChangePage={ handleChangePage }
                    onChangeRowsPerPage={ handleChangeRowsPerPage }
                />
            </div>
        )
    }

    const tableHeader = getTableHeaders();
    const body = getTableBody()
    const pagination = hasPagination ? getTablePagination() : null

    const tableClasses = {
        root: styles.tableRoot
    }

    return (
        <div className={ tableContainerClassName }>
            <MaterialTable classes={tableClasses}>
                { tableHeader }
                { body }
            </MaterialTable>
            { pagination }
        </div>
    )
}

export default Table
