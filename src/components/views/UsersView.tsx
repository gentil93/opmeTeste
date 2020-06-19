import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import PageView from 'components/base/PageView';
import Table, { RowWithID } from 'components/interfaces/Table';
import React from 'react';

const useStyles = makeStyles({
    root: {
        width: '100%',
    }
});

const UsersView = () => {
    const styles = useStyles();
    const headers = ['id', 'login']
    const rows: RowWithID[] = [
        {
            columns: ['1', 'acerola'],
            id: '1'
        },
        {
            columns: ['2', 'abacate'],
            id: '2'
        }
    ]

    return (
        <PageView title="Lista de usuários">
            <Paper className={ styles.root }>
                <Table
                    headers={ headers }
                    rows={ rows }
                    hasPagination={true}
                    noItemsMessage="Nenhum usuário encontrado"
                    page={0}
                    rowsPerPage={10}
                />
            </Paper>
        </PageView>
    )
}

export default UsersView
