import React, { useState, useEffect } from "react";
import { getAllCampaign, deleteCampaign } from "../services";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
} from "@material-ui/core";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import Visibility from "@material-ui/icons/Visibility";
import Loader from "../components/loader/Loader";

export default function LandingPage(props) {
  const { history } = props;
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCamp();
  }, []);

  const fetchCamp = async () => {
    const res = await getAllCampaign();
    if (Array.isArray(res)) {
      setCampaigns(res);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this template?")){
      return false
    }
    setLoading(true);
    const res = await deleteCampaign(id);
    if (res) {
      fetchCamp();
    } else {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!campaigns.length) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          color: "#a7a7a7",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 20, margin: "15px 0" }}>
          No campaign template found
        </div>
        <Button
          onClick={() => history.push("/add")}
          color="primary"
          variant="contained"
        >
          Add new
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Campaign name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>CreatedAt</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((template, index) => {
            return (
              <TableRow key={template._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{template.name}</TableCell>
                <TableCell>
                  {moment(template.startDate).format("DD, MMM, YYYY")}
                </TableCell>
                <TableCell>
                  {moment(template.createdAt).format("DD, MMM, YYYY")}
                </TableCell>
                <TableCell>
                  <div>
                    <IconButton
                      onClick={() =>
                        history.push(`/campaign-detail/${template._id}`, {
                          ...template,
                        })
                      }
                    >
                      <Visibility titleAccess="View campaign" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(template._id)}>
                      <DeleteIcon titleAccess="Delete" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div style={{display: 'flex', justifyContent: 'center', paddingTop: 10}}>
        <Button
          onClick={() => history.push("/add")}
          color="primary"
          variant="contained"
        >
          Add new
        </Button>
      </div>
    </div>
  );
}
