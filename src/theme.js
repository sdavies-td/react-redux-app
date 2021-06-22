import { createMuiTheme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles";

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
      default: "#fff",
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
  },
  paper: {
    padding: theme.spacing(4),
    margin: theme.spacing(4),
    justifyContent: "center",
    display: "flex",
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
  searchItem: {
    width: "100%",
  },
  placesItem: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  buttonRow: {
    marginLeft: "20px",
    marginRight: "20px",
  },
  search: {
    position: "relative",
    bitemRadius: theme.shape.bitemRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
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
    margin: theme.spacing(4),
  },
  buttonItem: { width: "100%", padding: theme.spacing(1) },
  row: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "10px",
  },
  date: {
    padding: theme.spacing(1), // width: "25%",
    width: "15%",
  },
  store: {
    padding: theme.spacing(1), // width: "25%",
    width: "25%",
  },
  customer: {
    padding: theme.spacing(1), // width: "25%",
    width: "25%",
  },
  shipping: {
    padding: theme.spacing(1), // width: "25%",
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
  },
  navBarTitle: {
    flexGrow: 1,
  },
};
