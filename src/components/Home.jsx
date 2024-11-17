
import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "documents"));
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(docs);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleDelete = async (docId) => {
    try {
      await deleteDoc(doc(db, "documents", docId));
      setDocuments(documents.filter((doc) => doc.id !== docId));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #89CFF0, #FFB6C1)",
        py: 6,
        px: 3,
      }}
    >
      <Container>
        <Typography
          variant="h3"
          sx={{
            mb: 4,
            textAlign: "center",
            fontWeight: "bold",
            color: "#2C3E50",
          }}
        >
          📄 DOCUMENT APP
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
          <Button
            variant="contained"
            component={Link}
            to="/createDoc"
            sx={{
              backgroundColor: "#FF6347",
              color: "white",
              py: 1,
              px: 4,
              fontSize: "1rem",
              borderRadius: "20px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              '&:hover': { backgroundColor: "#FF4500" },
            }}
          >
            + New Document
          </Button>
        </Box>

        <Typography variant="h5" sx={{ mb: 4, textAlign: "center", color: "#2C3E50" }}>
          Your Documents
        </Typography>

        <Grid container spacing={4}>
          {documents.length > 0 ? (
            documents.map((doc) => (
              <Grid item xs={12} sm={6} md={4} key={doc.id}>
                <Card
                  sx={{
                    borderRadius: "15px",
                    backgroundColor: "#FDF5E6",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s",
                    '&:hover': { transform: "translateY(-10px)" },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        color: "#2C3E50",
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {doc.title}
                    </Typography>

                    <Button
                      component={Link}
                      to={`/viewDoc/${doc.id}`}
                      size="small"
                      sx={{
                        backgroundColor: "#48C9B0",
                        color: "white",
                        borderRadius: "10px",
                        '&:hover': { backgroundColor: "#1ABC9C" },
                        mr: 1,
                      }}
                    >
                      View
                    </Button>

                    <Button
                      component={Link}
                      to={`/editDoc/${doc.id}`}
                      size="small"
                      sx={{
                        backgroundColor: "#3498DB",
                        color: "white",
                        borderRadius: "10px",
                        '&:hover': { backgroundColor: "#2980B9" },
                        mr: 1,
                      }}
                    >
                      <EditIcon />
                    </Button>

                    <Button
                      size="small"
                      onClick={() => handleDelete(doc.id)}
                      sx={{
                        backgroundColor: "#E74C3C",
                        color: "white",
                        borderRadius: "10px",
                        '&:hover': { backgroundColor: "#C0392B" },
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", width: "100%", color: "#2C3E50" }}>
              No documents found. Start by creating one!
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;

                

