import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SessionContext from 'contexts/SessionContext';
import React, { FC, useContext } from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const TopBar: FC = ({
    children
}) => {
    const styles = useStyles()
    const { setSession } = useContext(SessionContext) || { session: null, setSession: null };

    const onLogoutClick = () => {
        setSession?.(null)
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" color="secondary" className={ styles.title }>
                        GITHUB TESTE
                    </Typography>
                    <Button color="secondary" onClick={onLogoutClick}>Logout</Button>
                </Toolbar>
            </AppBar>
            { children }
        </>
    )
}

export default TopBar
