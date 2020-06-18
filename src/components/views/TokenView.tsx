import { Button, Card, CardContent, Collapse, createStyles, Grid, makeStyles, TextField, Theme } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Logo from 'components/base/Logo';
import SessionContext from 'contexts/SessionContext';
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { getGithubAPI } from 'utils/ApiClient';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridContainer: {
            height: '100%'
        },
        loginGrid: {
            display: 'flex',
            backgroundColor: "#EDF0F2",
            height: '100%',
            [theme.breakpoints.down('xs')]: {
                borderLeft: 'none',
                borderBottom: `40px solid ${theme.palette.primary.main}`
            }
        },
        alertRoot: {
            marginTop: '1em'
        },
        alertMessage: {
            color: '#282828',
            fontSize: 14
        },
        formHeader: {
            marginBottom: '40px'
        },
        loginContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: theme.spacing(10),
            [theme.breakpoints.down('xs')]: {
                padding: theme.spacing(5)
            }
        },
        loginCard: {
            width: '60%',
            minWidth: '400px'
        },
        fieldsContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: theme.spacing(7, 0, 4),
            [theme.breakpoints.down('xs')]: {
                padding: theme.spacing(6, 0)
            }
        },
        loginButtonContainer: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        accessText: {
            ...theme.typography.h2,
            width: '295px',
            [theme.breakpoints.down('xs')]: {
                ...theme.typography.h3,
                width: '240px'
            }
        },
        cardRoot: {
            width: '40%',
            minWidth: '450px',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                minWidth: 0,
                margin: '0 24px',
                borderRadius: '10px'
            }
        },
        cardContent: {
            padding: theme.spacing(0),
            '&:last-child': {
                paddingBottom: theme.spacing(0)
            }
        },
        logoContainer: {
            justifyContent: 'center'
        },
        logo: {
            [theme.breakpoints.down('xs')]: {
                height: '70px'
            }
        }
    })
);

const TokenView = () => {
    const styles = useStyles();
    const [token, setToken] = useState('')
    const [error, setError] = useState('')

    const { setSession } = useContext(SessionContext) || { setSession: null };

    const cardClasses = {
        root: styles.cardRoot
    };

    const cardContentClasses = {
        root: styles.cardContent
    };

    const boundChangeToken = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setError('')
        setToken(value)
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const res = await getGithubAPI(token)
            setSession?.({
                token
            })

        } catch (e) {
            if (e?.response) {
                if (e.response.data.message === "Bad credentials")
                    setError('Token inválido')
            } else {
                setError('Problema no servidor por favor tente novamente')
            }
        }

    }

    const alertClasses = {
        root: styles.alertRoot,
        message: styles.alertMessage
    };

    const alert = <Collapse in={ Boolean(error) }>
        <Alert severity="error" classes={ alertClasses }>
            <span>
                { error }
            </span>
        </Alert>
    </Collapse>;

    return (
        <Grid container={ true } className={ styles.gridContainer }>
            <Grid
                container={ true }
                item={ true }
                xs={ 12 }
                className={ styles.loginGrid }
                justify="center"
                alignItems="center"
            >
                <Card classes={ cardClasses }>
                    <CardContent classes={ cardContentClasses }>
                        <form className={ styles.loginContainer } onSubmit={ onSubmit }>
                            <div className={ styles.formHeader }>
                                <Logo
                                    className={ styles.logo }
                                    containerClass={ styles.logoContainer }
                                />
                            </div>

                            <div className={ styles.accessText }>
                                Por favor insira seu token do github
                            </div>

                            { alert }
                            <div className={ styles.fieldsContainer }>
                                <TextField
                                    label="Token"
                                    variant="outlined"
                                    type="text"
                                    value={ token }
                                    error={ Boolean(error) }
                                    onChange={ boundChangeToken }
                                    id="token"
                                />
                            </div>

                            <div className={ styles.loginButtonContainer }>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={ false }
                                    type="submit"
                                >
                                    Entrar
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default TokenView
