import {
  Button,
  Container,
  FormLabel,
  Grid,
  IconButton,
  Input,
  MenuItem,
  Select,
  Typography,
  withStyles,
} from "@material-ui/core";
import { styles } from "../../assets/styles/Styles";
import logo from "../../assets/images/BureauTechFundoBranco-01.png";
import "../Ata/CreateAta/Style.css";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import Loading from "../Loading/Loading";
import userServices from "../../services/user";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Alerta from "../../components/Snackbar/Alerta";
import { BrokenImage } from "@material-ui/icons";

const EditUser = (props) => {
  const { classes } = props;
  const [usuario, setUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [msgSucesso, setMsgSucesso] = useState("");
  const [msgErro, setMsgErro] = useState("");
  const [preview, setPreview] = useState("");
  const history = useHistory();
  const voltar = () => {
    history.goBack();
  };
  const location = useLocation();

  useEffect(() => {
    // Se tiver parâmetro, busca o usuário do parâmetro, se não tiver, busca o usuário logado
    let idBuscar = "";
    try {
      idBuscar = location.state.id;
    } catch (error) {
      idBuscar = props.id;
    }

    userServices
      .pegarUsuario(idBuscar)
      .then((user) => {
        setUsuario(user.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleChange = (event) => {
    const value = event.target.value;
    let nomePerfil = "";
    if (value === 1) {
      nomePerfil = "ADM";
    } else if (value === 2) {
      nomePerfil = "GER";
    } else {
      nomePerfil = "USU";
    }
    setUsuario({
      ...usuario,
      usuPerfil: event.target.value,
    });
    console.log(usuario);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const changePreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setPreview(reader.result);
  };

  const atualizarUsuario = (event) => {
    event.preventDefault();
    setIsLoadingBtn(true);

    var imagem = document.querySelector("#assinatura").files[0];
    var formData = new FormData();
    formData.append("usuario", JSON.stringify(usuario));
    formData.append("imagem", imagem);

    userServices
      .atualizarUsuario(formData)
      .then((res) => {
        setIsLoadingBtn(false);
        setMsgSucesso("Sucesso ao salvar alterações!");
        setMsgErro(false);
        setOpenSnack(true);
        history.push("profile", { id: usuario.usuId });
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoadingBtn(false);
        setOpenSnack(true);
        setMsgSucesso(false);
        setMsgErro("Ocorreu um erro ao salvar alterações");
      });
  };

  return (
    <Container style={{ marginTop: 30, marginBottom: 20 }}>
      {isLoading && <Loading />}
      {!isLoading && (
        <Grid container justify="center" className={classes.grid} style={{ paddingBottom: 40 }}>
          <Grid container justify="center">
            <Typography className={classes.biggerText} style={{ paddingBottom: 80, paddingTop: 20 }}>
              Edição do perfil
            </Typography>
          </Grid>
          <Grid container justify="space-around">
            <Grid item md={6}>
              {/* input nome */}
              <Grid container alignItems="center" style={{ paddingBottom: 50 }}>
                <Grid item>
                  <FormLabel htmlFor="nome">
                    <Typography
                      className={classes.normalText}
                      style={{
                        paddingRight: 20,
                        color: "white",
                      }}
                    >
                      Nome
                    </Typography>
                  </FormLabel>
                </Grid>
                <Grid item xs>
                  <Input
                    required
                    name="nome"
                    id="nome"
                    value={usuario.usuNome}
                    onChange={(e) => setUsuario({ ...usuario, usuNome: e.target.value })}
                    className={classes.textField}
                    disableUnderline
                  />
                </Grid>
              </Grid>

              {/* input email */}
              <Grid container alignItems="center" style={{ paddingBottom: 50 }}>
                <Grid item>
                  <FormLabel htmlFor="email">
                    <Typography
                      className={classes.normalText}
                      style={{
                        paddingRight: 20,
                        color: "white",
                      }}
                    >
                      Email
                    </Typography>
                  </FormLabel>
                </Grid>
                <Grid item xs>
                  <Input
                    type="email"
                    required
                    name="email"
                    id="email"
                    value={usuario.usuEmail}
                    onChange={(e) => setUsuario({ ...usuario, usuEmail: e.target.value })}
                    className={classes.textField}
                    disableUnderline
                  />
                </Grid>
              </Grid>

              {/* input telefone */}
              <Grid container alignItems="center" style={{ paddingBottom: 50 }}>
                <Grid item>
                  <FormLabel htmlFor="telefone">
                    <Typography
                      className={classes.normalText}
                      style={{
                        paddingRight: 20,
                        color: "white",
                      }}
                    >
                      Telefone
                    </Typography>
                  </FormLabel>
                </Grid>
                <Grid item xs>
                  <Input
                    type="tel"
                    required
                    name="telefone"
                    id="telefone"
                    value={usuario.usuTelefone}
                    onChange={(e) => setUsuario({ ...usuario, usuTelefone: e.target.value })}
                    className={classes.textField}
                    disableUnderline
                  />
                </Grid>
              </Grid>

              {/* input cargo */}
              <Grid container alignItems="center" style={{ paddingBottom: 50 }}>
                <Grid item>
                  <FormLabel htmlFor="cargo">
                    <Typography
                      className={classes.normalText}
                      style={{
                        paddingRight: 20,
                        color: "white",
                      }}
                    >
                      Cargo
                    </Typography>
                  </FormLabel>
                </Grid>
                <Grid item xs>
                  <Input
                    required
                    name="cargo"
                    id="cargo"
                    value={usuario.usuCargo}
                    onChange={(e) => setUsuario({ ...usuario, usuCargo: e.target.value })}
                    className={classes.textField}
                    disableUnderline
                  />
                </Grid>
              </Grid>

              {/* input área/empresa */}
              <Grid container alignItems="center" style={{ paddingBottom: 50 }}>
                <Grid item>
                  <FormLabel htmlFor="area">
                    <Typography
                      className={classes.normalText}
                      style={{
                        paddingRight: 20,
                        color: "white",
                      }}
                    >
                      Área/Empresa
                    </Typography>
                  </FormLabel>
                </Grid>
                <Grid item xs>
                  <Input
                    required
                    name="area"
                    id="area"
                    value={usuario.usuAreaEmpresa}
                    onChange={(e) => setUsuario({ ...usuario, usuAreaEmpresa: e.target.value })}
                    className={classes.textField}
                    disableUnderline
                  />
                </Grid>
              </Grid>

              {/* input perfil */}
              <Grid container alignItems="center" style={{ paddingBottom: 50 }}>
                <Grid item>
                  <FormLabel htmlFor="profile">
                    <Typography
                      className={classes.normalText}
                      style={{
                        paddingRight: 20,
                        color: "white",
                      }}
                    >
                      Perfil
                    </Typography>
                  </FormLabel>
                </Grid>
                <Grid item xs>
                  <Select
                    id="profile"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    // Ateração Daniel
                    value={usuario.usuPerfil}
                    onChange={handleChange}
                    className={classes.textField}
                    style={{ width: "7rem" }}
                  >
                    <MenuItem value={1}>ADM</MenuItem>
                    <MenuItem value={2}>GER</MenuItem>
                    <MenuItem value={3}>USU</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              {/* upload assinatura */}
              <Grid container alignItems="center">
                <Grid item>
                  <FormLabel htmlFor="assinatura">
                    <Typography
                      className={classes.normalText}
                      style={{
                        paddingRight: 20,
                        color: "white",
                      }}
                    >
                      Assinatura
                    </Typography>
                  </FormLabel>
                </Grid>
                <Grid item xs>
                  <input
                    required
                    name="assinatura"
                    accept="image/*"
                    id="assinatura"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => changePreview(e.target.files[0])}
                  />
                  <label htmlFor="assinatura">
                    <IconButton color="primary" aria-label="upload picture" component="span" className="no-margin">
                      <ImageOutlinedIcon className={classes.uploadFile} style={{ width: 100, height: 100 }} />
                    </IconButton>
                  </label>
                </Grid>
              </Grid>
              {preview && (
                <Grid item xs style={{ marginTop: 10 }}>
                  <Typography style={{ color: "white" }}>Prévia: </Typography>
                  <img src={preview} alt="Prévia da assinatura" style={{ maxWidth: 200, maxHeight: 200 }} />
                </Grid>
              )}
            </Grid>
            <Grid item md={5}>
              <Grid container justify="center">
                <Grid container justify="center">
                  {usuario.usuAssinatura && (
                    <img
                      // Alteração Daniel
                      src={"data:image/png;base64," + usuario.usuAssinatura}
                      alt="Imagem da assinatura"
                      style={{ maxWidth: 400, maxHeight: 400 }}
                    />
                  )}
                  {!usuario.usuAssinatura && <BrokenImage color="secondary" style={{ width: 300, height: 300 }} />}
                </Grid>
                <Grid container justify="center" style={{ paddingTop: 20 }}>
                  <Typography className={classes.normalText}>Assinatura Atual</Typography>
                </Grid>
                <Grid container justify="space-around" style={{ paddingTop: 50 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="bold"
                    onClick={atualizarUsuario}
                    style={{
                      color: "white",
                      fontSize: "1.5rem",
                      borderRadius: 40,
                      padding: "10px 50px",
                    }}
                  >
                    {isLoadingBtn ? <Loading /> : "Salvar"}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="bold"
                    onClick={voltar}
                    style={{
                      color: "white",
                      fontSize: "1.5rem",
                      borderRadius: 40,
                      padding: "10px 50px",
                    }}
                  >
                    {isLoadingBtn ? <Loading /> : "Voltar"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Alerta isOpen={openSnack} setIsOpen={setOpenSnack} sucesso={msgSucesso} erro={msgErro} />
        </Grid>
      )}
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(EditUser);
