import { Avatar, Breadcrumbs, CircularProgress, createStyles, makeStyles, Paper, Typography } from '@material-ui/core';
import CustomLink from 'components/base/Link';
import PageTitle from 'components/base/PageTitle';
import PageView from 'components/base/PageView';
import Table, { RowWithID } from 'components/interfaces/Table';
import { format } from 'date-fns';
import { Repositorie, UserDetails } from 'models/Interfaces';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetail, getUserRepos } from 'utils/ApiClient';
import { Routes } from 'utils/Routes';

interface InfoCellProps {
    title: string;
    value?: string | null;
}

const useStyles = makeStyles(({
    spacing,
    breakpoints
}) =>
    createStyles({
        detailsPaperRoot: {
            width: '100%',
            padding: spacing(6),
            display: 'flex',
            alignItems: 'center',
            [breakpoints.down('sm')]: {
                flexDirection: 'column'
            }

        },
        reposPaperRoot: {
            width: '100%',
            padding: spacing(6),
            display: 'flex',
            height: 'calc(100vh - 535px)',
            overflow: 'auto'
        },
        tableContainer: {
            overflow: 'auto',
            height: '100%',
            width: '100%'
        },
        avatar: {
            height: 150,
            width: 150,
            marginRight: spacing(4)
        },
        userInfo: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            [breakpoints.down('sm')]: {
                height: 120
            }
        },
        infoCell: {
            display: 'flex',
        },
        loadingContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%'
        },
        infoContainer: {
            margin: spacing(0, 4),
            display: 'flex',
            flexDirection: 'column',
            height: 150,
            justifyContent: 'space-evenly',
            [breakpoints.down('sm')]: {
                width: '50%',
                height: '100%'
            }
        },
        title: {
            marginRight: spacing(1)
        },
        breadCrumbRoot: {
            width: '100%',
            backgroundColor: '#EDF0F2',
            padding: spacing(0, 6),
            [breakpoints.up('md')]: {
                padding: spacing(4, 11, 0, 11),
                marginBottom: -spacing(3),
            }
        },
        pageWrapper: {
            paddingTop: spacing(2),
        }
    })
);

const UserDetailsView = () => {
    const styles = useStyles()
    const { username } = useParams() || { username: null }
    const [user, setUser] = useState<UserDetails | null>(null)
    const [loadingDetails, setLoadingDetails] = useState(false)
    const [loadingRepositories, setLoadingRepositories] = useState(false)
    const [repositories, setRepositories] = useState<Repositorie[]>([])

    useEffect(() => {
        if (username) {
            const fetchUser = async () => {
                try {
                    setLoadingDetails(true)
                    const res = await getUserDetail(username)
                    const responseUser: UserDetails = res.data

                    setUser(responseUser)
                } catch (e) {
                    console.warn(e)
                } finally {
                    setLoadingDetails(false)
                }
            }

            const fetchRepos = async () => {
                try {
                    setLoadingRepositories(true)
                    const res = await getUserRepos(username)
                    const responseRepositories: Repositorie[] = res.data

                    setRepositories(responseRepositories)
                } catch (e) {
                    console.warn(e)
                } finally {
                    setLoadingRepositories(false)
                }
            }

            fetchUser()
            fetchRepos()
        }
    }, [username])

    console.log(user)

    const detailsPaperClasses = {
        root: styles.detailsPaperRoot
    }

    const reposPaperClasses = {
        root: styles.reposPaperRoot
    }

    const breadCrumbClasses = {
        root: styles.breadCrumbRoot
    }

    const InfoCell: FC<InfoCellProps> = ({
        title,
        value,
        children
    }) => {
        const valueContent = children ?
            children :
            <Typography variant="h6">{ value || 'Não informado' }</Typography>

        return (
            <div className={ styles.infoCell }>
                <Typography className={ styles.title } variant="h4">{ title }:</Typography>
                { valueContent }
            </div>
        )
    }

    const InfoContainer: FC = ({ children }) => (
        <div className={ styles.infoContainer }>
            { children }
        </div>
    )

    const tableHeaders = ['ID', 'Nome', 'URL']
    const rows: RowWithID[] = repositories
        .filter(({ private: repositoryPrivacy }) => !repositoryPrivacy)
        .map(({
            id,
            name,
            html_url
        }) => {
            const link = (
                <CustomLink
                    href={ html_url }
                    text={ html_url }
                    target="_blank"
                />
            )

            return {
                columns: [id, name, link],
                id: String(id)
            }
        })

    const formattedDate = user?.created_at ? format(new Date(user.created_at), 'dd/MM/yyyy') : ''

    const loadingContainer = (
        <div className={ styles.loadingContainer }>
            <CircularProgress />
        </div>
    )

    const userUrl = user?.html_url ? (
        <InfoCell title="URL">
            <CustomLink
                href={ user?.html_url }
                text={ user?.html_url }
                target="_blank"
            />
        </InfoCell>
    ) : <InfoCell title="URL" value="Não definido" />

    const details = loadingDetails ? loadingContainer : (
        <>
            <Avatar className={ styles.avatar } alt="User Avatar" src={ user?.avatar_url } />
            <div className={ styles.userInfo }>
                <InfoContainer>
                    <InfoCell title="ID" value={ String(user?.id) } />
                    <InfoCell title="Login" value={ username } />
                </InfoContainer>
                <InfoContainer>
                    { userUrl }
                    <InfoCell title="Criado em" value={ formattedDate } />
                </InfoContainer>
            </div>
        </>
    )

    const reposTable = loadingRepositories ? loadingContainer : (
        <Table
            headers={ tableHeaders }
            rows={ rows }
            isHeaderSticky={ true }
            tableContainerClassName={ styles.tableContainer }
            noItemsMessage="Nenhum repositório encontrado"
        />
    )

    return (
        <div className={styles.pageWrapper}>
            <Breadcrumbs aria-label="breadcrumb" classes={breadCrumbClasses}>
                <CustomLink href={`/${Routes.UsersList}`} text={"Usuários"} />
            <Typography color="textPrimary">{user?.name}</Typography>
            </Breadcrumbs>
            <PageView title="Detalhes de usuário">
                <Paper classes={ detailsPaperClasses }>
                    { details }
                </Paper>

                <div>
                    <PageTitle title="Repositórios" />
                    <Paper classes={ reposPaperClasses }>
                        { reposTable }
                    </Paper>
                </div>

            </PageView>
        </div>
    )
}

export default UserDetailsView
