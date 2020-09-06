import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { getAllCampaign, getAllUsers } from "../services";
import draftToHtml from "draftjs-to-html";
import {
  makeStyles,
  Select,
  MenuItem,
  CircularProgress,
  Button,
} from "@material-ui/core";
import moment from "moment";

export default function CampaignDetail({ history }) {

  const { id } = useParams();
  const { state } = useLocation();
  const [tempData, setTempData] = useState(state);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectValue, setSelectValue] = useState("all");
  const classes = useStyle();

  useEffect(() => {
    // eslint-disable-next-line
    if (!state) {
      fetchData();
    } else {
      setLoading(false);
    }
    fetchAllUsers();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    const res = await getAllCampaign(id);
    if (res) {
      setTempData(res);
    }
    setLoading(false);
  };

  const fetchAllUsers = async () => {
    const res = await getAllUsers();
    if (res) {
      setUsers(res);
    }
  };

  const handleSend = () => {
      alert("Mail send!");
      history.push('/')
  }

  if (loading) return <Loader />;

  return (
    <div>
      <div>
        <div>
          <b>Name:</b> {tempData.name}
        </div>
        <div>
          <b>Start Date:</b> {moment(tempData.startDate).format("DD MMM YYYY")}
        </div>
      </div>
      <p className={classes.tempLabel} htmlFor="temp">
        Template View
      </p>
      {tempData && (
        <div
          id="temp"
          className={classes.content}
          dangerouslySetInnerHTML={{
            __html: draftToHtml(JSON.parse(tempData.content)),
          }}
        ></div>
      )}
      <div className={classes.footer}>
        <Select
          onChange={(e) => setSelectValue(e.target.value)}
          value={selectValue}
          style={{ width: "20%", marginRight: 10 }}
        >
          <MenuItem value="all">All</MenuItem>
          {users.map((user, index) => (
            <MenuItem value={user.name} key={user + index}>
              {user.name} ({user.name})
            </MenuItem>
          ))}
          {!users.length ? (
            <MenuItem>
              <CircularProgress size={15} />
            </MenuItem>
          ) : null}
        </Select>
        <Button onClick={handleSend} color="primary" variant="contained">
          Send
        </Button>
      </div>
    </div>
  );
}

const useStyle = makeStyles((theme) => ({
  content: {
    border: "1px solid",
  },
  tempLabel: {
    marginTop: 15,
    marginBottom: 8,
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: 10,
  },
}));
