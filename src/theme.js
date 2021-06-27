import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#eb4034",
    },
    error: {
      main: "#eb4034",
    },
    background: {
      default: "#ededed",
    },
  },
});

export const themeStyles = {
  root: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: "Medium",
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  paper: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  tablePaper: {
    paddingTop: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(0),
  },
  button: {
    marginTop: "40px",
    justifyContent: "center",
    display: "flex",
  },
  item: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  placesItem: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  inputRoot: {
    color: "inherit",
  },
  search: {
    paddingBottom: "10px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    padding: "auto",
  },
  subTitle: {
    marginTop: "40px",
    marginBottom: "20px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  orderBody: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  orderPaper: {
    padding: theme.spacing(4),
    margin: theme.spacing(1),
  },
  buttonRow: {
    alignItems: "center",
    display: "flex",
  },
  buttonItem: { width: "100%", padding: theme.spacing(1) },
  row: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "10px",
  },
  date: {
    padding: theme.spacing(1),
    width: "15%",
  },
  store: {
    padding: theme.spacing(1),
    width: "25%",
  },
  customer: {
    padding: theme.spacing(1),
    width: "25%",
  },
  shipping: {
    padding: theme.spacing(1),
    width: "15%",
  },
  itemRow: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  name: { width: "25%" },
  qty: { width: "10%" },
  supplier: { width: "20%" },
  price: { width: "20%" },
  subtotal: { width: "25%" },
  itemAddRemove: { width: "15%" },
  totalItems: {
    marginBottom: "10px",
    width: "57%",
  },
  totalRow: {
    alignItems: "center",
    display: "column",
    justifyContent: "flex-end",
    paddingLeft: "69.5%",
  },
  orderButtonRow: {
    alignItems: "center",
    display: "flex",
  },
  navbarRoot: {
    flexGrow: 1,
    position: "static",
    background: "#fff",
  },
  navBarTitle: {
    flexGrow: 1,
    paddingTop: "5px",
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-around",
    display: "flex",
  },
  navLinksRow: {
    alignItems: "center",
    display: "flex",
  },
  navLinkItem: {
    marginLeft: "1px",
    marginRight: "1px",
  },
  footerRow: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  footerItem: {
    marginLeft: "2px",
    marginRight: "2px",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
};
