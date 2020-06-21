import { Avatar, CircularProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'components/base/Link';
import PageView from 'components/base/PageView';
import Table, { RowWithID } from 'components/interfaces/Table';
import { User } from 'models/Interfaces';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getUsers } from 'utils/ApiClient';
import { Routes } from 'utils/Routes';

const useStyles = makeStyles({
    paper: {
        width: '100%',
        height: 'calc(100vh - 200px)',
        overflow: 'auto'
    },
    tableContainer: {
        overflow: 'auto',
        height: '100%',
        width: '100%'
    },
    avatar: {
        margin: 'auto'
    },
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
    },
});

const UsersView = () => {
    const styles = useStyles();
    const headers = ['Avatar', 'ID', 'Login', 'URL']
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [users, setUsers] = useState<User[]>([])
    const history = useHistory();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const since = page * rowsPerPage

        const fetchUsers = async () => {
            try {
                setLoading(true)
                const res = await getUsers(since)
                const responseUser: User[] = res.data

                setUsers(responseUser)
            } catch (e) {
                console.warn(e)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [page, rowsPerPage])

    const boundOnRowClick = (id: string) => {
        const { login } = users.find(({ id: userId }) => id === String(userId)) || { login: null }

        if (login) {
            const route = `${Routes.UserDetails}`.replace(':username', login)
            history.push(route)
        }
    }

    const rows: RowWithID[] = users
        .map(({ id, login, html_url, avatar_url }) => {
            const avatarClasses = {
                root: styles.avatar
            }

            const link = (
                <Link
                    href={ html_url }
                    text={ html_url }
                    target="_blank"
                />
            )

            const avatar = (
                <Avatar
                    alt="User Avatar"
                    src={ avatar_url }
                    classes={ avatarClasses }
                />
            )

            return ({
                columns: [avatar, id, login, link],
                id: String(id)
            })
        })
        .slice(0, rowsPerPage)

    const loadingContainer = (
        <div className={ styles.loadingContainer }>
            <CircularProgress />
        </div>
    )

    const content = loading ?
        loadingContainer : (
            <Table
                headers={ headers }
                rows={ rows }
                hasPagination={ true }
                tableContainerClassName={ styles.tableContainer }
                rowsPerPageOptions={ [10, 20, 30] }
                isPaginationSticky={ true }
                isHeaderSticky={ true }
                noItemsMessage="Nenhum usuário encontrado"
                page={ page }
                onPageChange={ setPage }
                onRowClick={ boundOnRowClick }
                onRowsPerPageChange={ setRowsPerPage }
                rowsPerPage={ rowsPerPage }
            />
        )

    return (
        <PageView title="Lista de usuários">
            <Paper className={ styles.paper }>
                { content }
            </Paper>
        </PageView>
    )
}

export default UsersView
