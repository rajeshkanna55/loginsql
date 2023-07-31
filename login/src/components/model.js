
import {TextField,Grid,Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions} from '@mui/material';

export const Model=({open,close,save,data,setData})=>{
    return (
      <>
        <Dialog
          open={open}
          // TransitionComponent={Transition}
          keepMounted
          onClose={close}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="md"
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: "white",
            },
          }}
        >
          <DialogTitle sx={{ textAlign: "center", color: "white" }}>
            {"Edit The User Details"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="standard-search"
                    label="Username"
                    type="text"
                    variant="standard"
                    value={data.fullname}
                    //  multiline
                    //  rows={4}
                    InputLabelProps={{
                      style: {
                        color: "rgb(134,110,199)",
                      },
                    }}
                    InputProps={{
                      style: {
                        color: "rgb(134,110,199)",
                        borderBottom: "1px solid white",
                      },
                    }}
                    sx={{
                      color: " rgb(134,110,199)",
                      borderBottom: "1px solid rgb(134,110,199)",
                    }}
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        fullname: e.target.value,
                      }));
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="standard-search"
                    label="Email"
                    variant="standard"
                    value={data.email}
                    InputLabelProps={{
                      style: {
                        color: "rgb(134,110,199)",
                      },
                    }}
                    InputProps={{
                      style: {
                        color: "rgb(134,110,199)",
                        borderBottom: "1px solid rgb(134,110,199)",
                      },
                    }}
                    sx={{
                      color: " rgb(134,110,199)",
                      borderBottom: "1px solid rgb(134,110,199)",
                    }}
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, email: e.target.value }));
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="standard-search"
                    label="Address"
                    type="text"
                    variant="standard"
                    value={data.address}
                    rows={3}
                    multiline
                    InputLabelProps={{
                      style: {
                        color: "rgb(134,110,199)",
                      },
                    }}
                    InputProps={{
                      style: {
                        color: "rgb(134,110,199)",
                        borderBottom: "1px solid rgb(134,110,199)",
                      },
                    }}
                    sx={{
                      color: " rgb(134,110,199)",
                      borderBottom: "1px solid rgb(134,110,199)",
                    }}
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, address: e.target.value }));
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    // error={!pattern}
                    fullWidth
                    id="standard-search"
                    label="Age"
                    variant="standard"
                    value={data.age}
                    //   inputProps={{
                    //     pattern:'[0-9]',
                    //     title: 'Please Enter Only Numbers'
                    //   }}
                    InputLabelProps={{
                      style: {
                        color: "rgb(134,110,199)",
                      },
                    }}
                    InputProps={{
                      style: {
                        color: "rgb(134,110,199)",
                        borderBottom: "1px solid rgb(134,110,199)",
                      },
                    }}
                    sx={{
                      color: " rgb(134,110,199)",
                      borderBottom: "1px solid rgb(134,110,199)",
                    }}
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, age: e.target.value }));
                    }}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button id="cancel_edit" onClick={close}>
              Close{" "}
            </Button>
            <Button id="save_edit" onClick={save}>
              Save{" "}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );

}