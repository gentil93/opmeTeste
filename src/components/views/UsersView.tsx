import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import PageView from 'components/base/PageView';
import Table, { RowWithID } from 'components/interfaces/Table';
import React, { useEffect, useState } from 'react';
import { getUsers } from 'utils/ApiClient';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 'calc(100vh - 200px)',
        overflow: 'auto'
    },
    tableContainer: {
        overflow: 'auto',
        height: '100%'
    }
});

interface User {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
}

const UsersView = () => {
    const styles = useStyles();
    const headers = ['id', 'login']
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const since = page * rowsPerPage

        const fetchUsers = async () => {
            try {
                const res = await getUsers(since)
                const responseUser: User[] = res.data

                setUsers(responseUser)
            } catch (e) {
                console.warn(e)
            }
        }

        fetchUsers()
    }, [page, rowsPerPage])

    const boundOnRowClick = (id: string) => {
        console.log(id)
    }

    const rows: RowWithID[] = users
        .map(({ id, login }) => ({
        columns: [id, login],
        id: String(id)
    }))
        .slice(0, rowsPerPage)

    return (
        <PageView title="Lista de usuários">
            <Paper className={ styles.root }>
                <Table
                    headers={ headers }
                    rows={ rows }
                    hasPagination={ true }
                    tableContainerClassName={styles.tableContainer}
                    rowsPerPageOptions={ [10, 20, 30] }
                    isPaginationSticky={true}
                    isHeaderSticky={true}
                    noItemsMessage="Nenhum usuário encontrado"
                    page={ page }
                    onPageChange={ setPage }
                    onRowClick={ boundOnRowClick }
                    onRowsPerPageChange={ setRowsPerPage }
                    rowsPerPage={ rowsPerPage }
                />
            </Paper>
        </PageView>
    )
}

export default UsersView
