import React, { Component } from "react";
import { connect } from "react-redux";
import { createCustomer } from "../../store/actions/customerActions";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Input,
  Grid,
  Typography,
  FormControlLabel,
  TextField,
  Paper,
} from "@material-ui/core";
import Loader from "../layout/Loader";

class EditSupplierItem extends Component {
  state = {
    supplierName: "",
    supplierLink: "",
    supplierPrice: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    this.setState(
      {
        fullName: this.state.firstName + " " + this.state.lastName,
      },
      () => {
        e.preventDefault();
        this.props.createCustomer(this.state);
        this.props.history.push("/customers");
      }
    );
  };

  render() {
    const useStyles = makeStyles((theme) => ({
      paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
      },
      layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 600,
          marginLeft: "auto",
          marginRight: "auto",
        },
      },
    }));
    const { auth, supplier } = this.props;
    const classes = useStyles;
    //console.log(supplier);
    if (!auth.uid) return <Redirect to="/auth/signin" />;
    if (supplier) {
      return (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Shipping address
          </Typography>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address1"
                    name="address1"
                    label="Address line 1"
                    fullWidth
                    autoComplete="shipping address-line1"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address2"
                    name="address2"
                    label="Address line 2"
                    fullWidth
                    autoComplete="shipping address-line2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="shipping address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="shipping country"
                  />
                </Grid>
              </Grid>
            </Paper>
          </main>
        </React.Fragment>
      );
    } else {
      return <Loader />;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const suppliers = state.firestore.data.suppliers;
  const supplier = suppliers ? suppliers[id] : null;
  return {
    auth: state.firebase.auth,
    supplier,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCustomer: (customer) => dispatch(createCustomer(customer)),
  };
};

export default compose(
  firestoreConnect((ownProps) => {
    //console.log(ownProps);
    const str = ownProps.match.url;
    const itemId = str.split("item/").pop().split("/suppliers")[0];
    return [
      {
        collection: "items",
        doc: itemId,
        subcollections: [{ collection: "suppliers" }],
        storeAs: "suppliers",
      },
    ];
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(EditSupplierItem);
