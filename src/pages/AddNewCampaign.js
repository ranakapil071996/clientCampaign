import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, TextField, makeStyles } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import moment from "moment";
import { addNewCampaign } from "../services";
import Loader from "../components/loader/Loader";

export default function AddNewCampaign({ history }) {
  const classes = useStyle();
  const [state, setState] = useState({ editorState: null });
  const [selectedDate, setselectedDate] = useState(new Date());
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setState({ editorState: EditorState.createEmpty() });
  }, []);

  const add = async () => {
    if (validations()) {
      const content = JSON.stringify(
        convertToRaw(state.editorState.getCurrentContent())
	  );
      const body = {
        name,
        startDate: moment(selectedDate).format('MM/DD/YYYY').toString(),
        content,
    };
    // console.log(body)
    // return
      setLoading(true);
      const res = await addNewCampaign(body);
      if (res) {
        alert("Campaign added successfully");
        history.push("/");
      }
      setLoading(false);
    }
  };

  const validations = () => {
    if (!name) {
      alert("Enter campaign name!!");
      return false;
    }
    if (!moment(selectedDate).isValid()) {
      alert("Invalid date");
      return false;
    }
    return true;
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className={classes.header}>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginRight: 15 }}
          label="Campaign name"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            autoOk
            variant="inline"
            color="primary"
            label="Campaign start"
            value={selectedDate}
            onChange={(date) => setselectedDate(date)}
          />
        </MuiPickersUtilsProvider>
      </div>
      <Editor
        editorState={state.editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={(editorState) => setState({ editorState })}
        editorStyle={{ height: 200, border: "1px solid" }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10}}>
        <Button color="primary" variant="contained" onClick={add}>
          Add
        </Button>
      </div>
    </div>
  );
}

const useStyle = makeStyles((theme) => ({
  header: {
    padding: "15px 0",
  },
}));
