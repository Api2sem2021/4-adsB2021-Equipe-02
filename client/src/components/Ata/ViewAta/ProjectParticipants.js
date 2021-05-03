import { Container, FormLabel, Grid, withStyles, Typography } from "@material-ui/core";
import "./Components.css";
import { styles } from "../../../assets/styles/Styles";
import ParticipantsRow from "./ParticipantsRow";

const ProjectParticipants = (props) => {
  const { classes, infoProject } = props;

  return (
    <Container>
      <Grid container className={classes.grid} style={{ paddingBottom: 15, paddingRight: 0 }}>
        <Grid item xs={12}>
          <Grid container justify="flex-start" alignItems="center" style={{ marginBottom: 30, paddingTop: 20 }}>
            <FormLabel className={classes.normalText} style={{ marginRight: 15 }}>
              Projeto:
            </FormLabel>
            <Grid item xs={12} sm={5} md={4}>
              <Typography id="temaProjeto" className={classes.normalText} style={{ fontWeight: "bold" }}>
                {infoProject.projeto}
              </Typography>
            </Grid>
          </Grid>
          <ParticipantsRow listaParticipantes={infoProject.participantes} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(ProjectParticipants);