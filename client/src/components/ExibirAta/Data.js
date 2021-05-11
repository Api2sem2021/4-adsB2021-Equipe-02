import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DataGrid, GridToolbar	} from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import "./Data.css";
import ptBR from "../ptBR/DataGrid";
import dataServices from "../../services/data.js";

const useStyles = makeStyles((theme) => ({
  grid: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "20px",
    padding: 15,
    paddingBottom: 50,
    [theme.breakpoints.up("md")]: { width: "90%" },
    [theme.breakpoints.down("md")]: { width: "95%" },
    [theme.breakpoints.up("lg")]: { width: "80%" },
    height: 800,
    marginRight: 10,
  },
  datagrid: {
    backgroundColor: "#FFFFFF",
  },
  btn: {
    color: "white",
    backgroundColor: theme.palette.secondary.main,
    fontWeight: 700,
    fontSize: "1rem",
    borderRadius: 20,
    padding: "5px 20px",
    "&:hover": {
      backgroundColor: "white",
      color: theme.palette.secondary.main,
    },
  },
  container: {
    marginTop: 5,
    justifyContent: "center",
  },
  icon: {
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
}));

  export default function Data() {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [openSnack, setOpenSnack] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [msgSucesso, setMsgSucesso] = useState("");
    const [msgErro, setMsgErro] = useState("");
    const history = useHistory();

  useEffect(() => {
    dataServices
    .listarAtas("DataGrid")
    .then((res) => {
      let lista = res.data;
      let lista2 = [];
      lista.forEach((ata) => {
        lista2.push({ id: ata["ataId"], ...ata });
      });
      setRows(lista2);
    })
    .catch((err) => {
      console.log(err.message);
      setIsLoading(false);
      setMsgSucesso(false);
      setMsgErro("Ocorreu um erro ao carregar a lista de atas");
      setOpenSnack(true);
    });
}, [setRows]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "ataProjeto", headerName: "Projeto", width: 200 },
    { field: "ataPauta", headerName: "Pauta", width: 200 },
    { field: "ataDataCriacao", headerName: "Criado em", width: 150 },
    /*{ field: "ataLocal", headerName: "Local", width: 150 },    { field: "tipo", headerName: "Tipo", width: 150 }, 
    { field: "estado", headerName: "Estado", width: 150 },*/
    {
      field: "Exibir",
      headerName: "Exibir",
      width: 130,
      renderCell: (params) => (
        <Button onClick={() => history.push("ata", { id: params.getValue("id") })}>
          <VisibilityIcon className="icon" />
        </Button>
      ),
    },
  ];
  
    return (
      <Grid container justify="center">
        <Grid className={classes.grid} direction="column" alignItems="center">
          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            className={classes.datagrid}
            checkboxSelection={true}
            hideFooter={true}
            localeText={ptBR}
            disableSelectionOnClick={true}
          />
        </Grid>
      </Grid>
    );
    
};