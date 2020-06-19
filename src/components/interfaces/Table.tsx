import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
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
    onPageChange?: (page: number) => void;
    onRowsPerPageChange?: (rowsPerPage: number) => void;
    rowsPerPage?: number;
    page?: number;
}

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    noItemsMessage: {
        textAlign: 'center'
    },
});

const Table = ({
    headers,
    rows,
    noItemsMessage,
    hasPagination,
    onRowClick,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage
}: TableProps) => {
    const styles = useStyles();

    const getTableHeaders = (): ReactNode => {
        const tableHeaders = headers.map((header, idx) => (
            <TableCell
                key={ idx }
                align='center'
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

        return (
            <TableRow hover tabIndex={ -1 } key={ id || '' } onClick={ onClick }>
                { columns.map((column) => {
                    return (
                        <TableCell key={ id || '' } align='center'>
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
        }) => `Página ${from}`;

        return (
            <TablePagination
                rowsPerPageOptions={ [10, 25, 100] }
                component="div"
                count={ rows.length }
                labelRowsPerPage='Tuplas por página'
                labelDisplayedRows={getPaginationLabel}
                rowsPerPage={ rowsPerPage || 10 }
                page={ page ?? 0 }
                onChangePage={ handleChangePage }
                onChangeRowsPerPage={ handleChangeRowsPerPage }
            />
        )
    }

    const tableHeader = getTableHeaders();
    const body = getTableBody()
    const pagination = hasPagination ? getTablePagination() : null

    return (
        <>
            <TableContainer >
                <MaterialTable>
                    { tableHeader }
                    { body }
                </MaterialTable>
            </TableContainer>
            { pagination }
        </>
    )
}

export default Table
